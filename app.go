package main

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/google/uuid"
)

// App struct
type App struct {
	ctx   context.Context
	store *db.Store
}

// NewApp creates a new App application struct
func NewApp(store *db.Store) *App {
	app := &App{store: store}
	return app
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after the front-end dom has been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

type Order struct {
	ID                uuid.UUID `json:"ID"`
	RecievedDate      string    `json:"recieved_date"`
	DeliveryDate      string    `json:"delivery_date"`
	Comments          string    `json:"comments"`
	ClientName        string    `json:"client_name"`
	ClientID          string    `json:"client_id"`
	ClientAddress     string    `json:"client_address"`
	ClientPhone       string    `json:"client_phone"`
	ClientEmail       string    `json:"client_email"`
	GarmentTotal      int       `json:"garment_total"`
	PaymentTotalPayed string    `json:"payment_total_payed"`
	PaymentTotal      string    `json:"payment_total"`
	PaymentTotalReal  string    `json:"payment_total_real"`
}

func (a *App) CreateOrder(order Order) Order {
	paymentTotalPayed, _ := strconv.Atoi(order.PaymentTotalPayed)
	paymentTotal, _ := strconv.Atoi(order.PaymentTotal)
	paymentTotalReal := paymentTotal - paymentTotalPayed
	recievedDate, _ := time.Parse(time.RFC3339, order.RecievedDate)
	deliveryDate, _ := time.Parse(time.RFC3339, order.DeliveryDate)

	arg := db.CreateOrderParams{
		ID:                uuid.New(),
		RecievedDate:      recievedDate,
		DeliveryDate:      deliveryDate,
		Comments:          order.Comments,
		ClientName:        order.ClientName,
		ClientID:          order.ClientID,
		ClientAddress:     order.ClientAddress,
		ClientPhone:       order.ClientPhone,
		ClientEmail:       order.ClientEmail,
		GarmentTotal:      strconv.Itoa(order.GarmentTotal),
		PaymentTotalPayed: order.PaymentTotalPayed,
		PaymentTotal:      order.PaymentTotal,
		PaymentTotalReal:  strconv.Itoa(paymentTotalReal),
	}
	createdOrder, err := a.store.CreateOrder(context.Background(), arg)

	if err != nil {
		log.Fatal("error creating order", err)
	}

	garmetTotal, errGarment := strconv.Atoi(createdOrder.GarmentTotal)

	if errGarment != nil {
		log.Fatal("error Atoi Garment", err)
	}

	return Order{
		ID:                createdOrder.ID,
		RecievedDate:      createdOrder.RecievedDate.Format(time.RFC3339),
		DeliveryDate:      createdOrder.DeliveryDate.Format(time.RFC3339),
		Comments:          createdOrder.Comments,
		ClientName:        createdOrder.ClientName,
		ClientID:          createdOrder.ClientID,
		ClientAddress:     createdOrder.ClientAddress,
		ClientPhone:       createdOrder.ClientPhone,
		ClientEmail:       createdOrder.ClientEmail,
		GarmentTotal:      garmetTotal,
		PaymentTotalPayed: createdOrder.PaymentTotalPayed,
		PaymentTotal:      createdOrder.PaymentTotal,
		PaymentTotalReal:  createdOrder.PaymentTotalPayed,
	}
}

func (a *App) GetNextOrderIdentifier() int32 {
	nextIdentifier, err := a.store.GetNextOrderIdentifier(context.Background())

	if err != nil {
		nextIdentifier = 1
	}

	return nextIdentifier
}
