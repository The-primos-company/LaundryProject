package db

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
)

// Store provides all functionalities to execute db queries and transactions
type Store struct {
	*Queries
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db:      db,
		Queries: New(db),
	}
}

//execTx executes a function within a database transaction
func (store *Store) execTx(ctx context.Context, fn func(*Queries) error) error {
	tx, err := store.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	q := New(tx)
	err = fn(q)
	if err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("tx err: %v, rb err: %v", err, rbErr)
		}
		return err
	}

	return tx.Commit()
}

type CreateGarmentTxParams struct {
	Cuantity string `json:"cuantity"`
	Category string `json:"category"`
	Gendre   string `json:"gendre"`
	Color    string `json:"color"`
	Brand    string `json:"brand"`
	Price    string `json:"price"`
	Comment  string `json:"comment"`
	Defects  string `json:"defects"`
}

type CreateOrderTxParams struct {
	DeliveryDate      time.Time               `json:"delivery_date"`
	ClientName        string                  `json:"client_name"`
	ClientID          string                  `json:"client_id"`
	ClientAddress     string                  `json:"client_address"`
	ClientPhone       string                  `json:"client_phone"`
	ClientEmail       string                  `json:"client_email"`
	GarmentTotal      string                  `json:"garment_total"`
	PaymentTotalPayed string                  `json:"payment_total_payed"`
	PaymentTotal      string                  `json:"payment_total"`
	PaymentTotalReal  string                  `json:"payment_total_real"`
	Garments          []CreateGarmentTxParams `json:"garments"`
}

type CreateGarmentTxResults struct {
	ID       uuid.UUID `json:"id"`
	OrderID  uuid.UUID `json:"order_id"`
	Cuantity string    `json:"cuantity"`
	Category string    `json:"category"`
	Gendre   string    `json:"gendre"`
	Color    string    `json:"color"`
	Brand    string    `json:"brand"`
	Price    string    `json:"price"`
	Comment  string    `json:"comment"`
	Defects  string    `json:"defects"`
}

type CreateOrderTxResults struct {
	ID                uuid.UUID                `json:"ID"`
	Identifier        string                   `json:"identifier"`
	RecievedDate      time.Time                `json:"recieved_date"`
	DeliveryDate      time.Time                `json:"delivery_date"`
	ClientName        string                   `json:"client_name"`
	ClientID          string                   `json:"client_id"`
	ClientAddress     string                   `json:"client_address"`
	ClientPhone       string                   `json:"client_phone"`
	ClientEmail       string                   `json:"client_email"`
	GarmentTotal      string                   `json:"garment_total"`
	PaymentTotalPayed string                   `json:"payment_total_payed"`
	PaymentTotal      string                   `json:"payment_total"`
	PaymentTotalReal  string                   `json:"payment_total_real"`
	Garments          []CreateGarmentTxResults `json:"garments"`
}

//This transaction creates an order and then all the corresponding garments related, in fail it rollback the change in database
//If everything is okay it commits to database.
func (store *Store) CreateOrderTx(ctx context.Context, arg CreateOrderTxParams) (CreateOrderTxResults, error) {
	var result CreateOrderTxResults

	err := store.execTx(ctx, func(q *Queries) error {
		//create the order
		order, err := q.CreateOrder(ctx, CreateOrderParams{
			ID:                uuid.New(),
			RecievedDate:      time.Now(),
			DeliveryDate:      arg.DeliveryDate,
			ClientName:        arg.ClientName,
			ClientID:          arg.ClientID,
			ClientAddress:     arg.ClientAddress,
			ClientPhone:       arg.ClientPhone,
			ClientEmail:       arg.ClientEmail,
			GarmentTotal:      arg.GarmentTotal,
			PaymentTotalPayed: arg.PaymentTotalPayed,
			PaymentTotal:      arg.PaymentTotal,
			PaymentTotalReal:  arg.PaymentTotalReal,
		})

		if err != nil {
			return err
		}
		//create garments
		garments := make([]CreateGarmentTxResults, len(arg.Garments))

		for i := 0; i < len(arg.Garments); i++ {
			argG := arg.Garments[i]

			garment, err := q.CreateGarment(ctx, CreateGarmentParams{
				ID:       uuid.New(),
				OrderID:  order.ID,
				Cuantity: argG.Cuantity,
				Category: argG.Category,
				Gendre:   argG.Gendre,
				Color:    argG.Color,
				Brand:    argG.Brand,
				Price:    argG.Price,
				Comment:  argG.Comment,
				Defects:  argG.Defects,
			})
			if err != nil {
				return err
			}

			garments[i] = CreateGarmentTxResults{
				ID:       garment.ID,
				OrderID:  garment.OrderID,
				Cuantity: garment.Cuantity,
				Category: garment.Category,
				Gendre:   garment.Gendre,
				Color:    garment.Color,
				Brand:    garment.Color,
				Price:    garment.Price,
				Comment:  garment.Comment,
				Defects:  garment.Defects,
			}
		}

		result = CreateOrderTxResults{
			ID:                order.ID,
			RecievedDate:      order.RecievedDate,
			DeliveryDate:      order.DeliveryDate,
			ClientName:        order.ClientName,
			ClientID:          order.ClientID,
			ClientAddress:     order.ClientAddress,
			ClientPhone:       order.ClientPhone,
			ClientEmail:       order.ClientEmail,
			GarmentTotal:      order.GarmentTotal,
			PaymentTotalPayed: order.PaymentTotalPayed,
			PaymentTotal:      order.PaymentTotal,
			PaymentTotalReal:  order.PaymentTotalReal,
			Garments:          garments,
		}
		return nil
	})

	return result, err
}
