package service

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/google/uuid"
)

// OrderService struct
type OrderService struct {
	store *db.Store
}

func newOrderService(store *db.Store) OrderService {
	return OrderService{
		store: store,
	}
}

type Order struct {
	ID                uuid.UUID `json:"ID"`
	Identifier        string    `json:"identifier"`
	RecievedDate      string    `json:"recieved_date"`
	DeliveryDate      string    `json:"delivery_date"`
	ClientName        string    `json:"client_name"`
	ClientID          string    `json:"client_id"`
	ClientAddress     string    `json:"client_address"`
	ClientPhone       string    `json:"client_phone"`
	ClientEmail       string    `json:"client_email"`
	GarmentTotal      int       `json:"garment_total"`
	PaymentTotalPayed string    `json:"payment_total_payed"`
	PaymentTotal      string    `json:"payment_total"`
	PaymentTotalReal  string    `json:"payment_total_real"`
	Garments          []Garment `json:"garments"`
}

func (s *OrderService) CreateOrder(arg Order) Order {
	deliveryDate, err := time.Parse(time.RFC3339, arg.DeliveryDate)

	if err != nil {
		log.Panic("error parsing date", err)
	}
	paymentTotal, errPt := strconv.Atoi(arg.PaymentTotal)
	paymentTotalPayed, errPtp := strconv.Atoi(arg.PaymentTotalPayed)

	if errPt != nil || errPtp != nil {
		log.Panic("error parsing totals to int")
	}
	paymentTotalReal := paymentTotal - paymentTotalPayed

	garments := make([]db.CreateGarmentTxParams, len(arg.Garments))
	for i := 0; i < len(arg.Garments); i++ {
		argG := arg.Garments[i]
		garments[i] = db.CreateGarmentTxParams{
			Cuantity: argG.Cuantity,
			Category: argG.Category,
			Gendre:   argG.Gendre,
			Color:    argG.Color,
			Brand:    argG.Brand,
			Price:    argG.Price,
			Comment:  argG.Comment,
			Defects:  argG.Defects,
		}
	}

	order, err := s.store.CreateOrderTx(context.Background(), db.CreateOrderTxParams{
		DeliveryDate:      deliveryDate,
		ClientName:        arg.ClientName,
		ClientID:          arg.ClientID,
		ClientAddress:     arg.ClientAddress,
		ClientPhone:       arg.ClientPhone,
		ClientEmail:       arg.ClientEmail,
		GarmentTotal:      strconv.Itoa(arg.GarmentTotal),
		PaymentTotalPayed: arg.PaymentTotalPayed,
		PaymentTotal:      arg.PaymentTotal,
		PaymentTotalReal:  strconv.Itoa(paymentTotalReal),
		Garments:          garments,
	})

	if err != nil {
		log.Panic("error creating order", err)
	}

	garmentTotal, err := strconv.Atoi(order.GarmentTotal)

	if err != nil {
		log.Panic("error converting garment total to integer", err)
	}

	garmentsR := make([]Garment, len(order.Garments))
	for i := 0; i < len(order.Garments); i++ {
		argG := order.Garments[i]
		garmentsR[i] = Garment{
			OrderID:  argG.OrderID,
			Cuantity: argG.Cuantity,
			Category: argG.Category,
			Gendre:   argG.Gendre,
			Color:    argG.Color,
			Brand:    argG.Brand,
			Price:    argG.Price,
			Comment:  argG.Comment,
			Defects:  argG.Defects,
		}
	}

	return Order{
		ID:                order.ID,
		RecievedDate:      order.RecievedDate.Format(time.RFC3339),
		DeliveryDate:      order.DeliveryDate.Format(time.RFC3339),
		ClientName:        order.ClientName,
		ClientID:          order.ClientID,
		ClientAddress:     order.ClientAddress,
		ClientPhone:       order.ClientPhone,
		ClientEmail:       order.ClientEmail,
		GarmentTotal:      garmentTotal,
		PaymentTotalPayed: order.PaymentTotalPayed,
		PaymentTotal:      order.PaymentTotal,
		PaymentTotalReal:  order.PaymentTotalReal,
		Garments:          garmentsR,
	}
}

func (s *OrderService) GetNextOrderIdentifier() int32 {
	nextIdentifier, err := s.store.GetNextOrderIdentifier(context.Background())

	if err != nil {
		nextIdentifier = 1
	}

	return nextIdentifier
}

func (s *OrderService) GetOrderByClientName(clientName string, limit int32, offset int32) []Order {
	filterParams := db.GetOrdersByClientNameParams{
		ClientName: clientName,
		Limit:      limit,
		Offset:     offset,
	}

	orders, err := s.store.GetOrdersByClientName(context.Background(), filterParams)
	if err != nil {
		log.Fatal("error getting order by name", err)
	}

	ordersDb := make([]Order, len(orders))

	for i := 0; i < len(orders); i++ {
		order := orders[i]

		garmentsDb, _ := s.store.ListGarmentsByOrder(context.Background(), order.ID)
		garments := make([]Garment, len(garmentsDb))
		for j := 0; j < len(garmentsDb); j++ {
			garmentDb := garmentsDb[j]
			garments[j] = Garment{
				ID:       garmentDb.ID,
				OrderID:  garmentDb.OrderID,
				Cuantity: garmentDb.Cuantity,
				Category: garmentDb.Category,
				Gendre:   garmentDb.Gendre,
				Color:    garmentDb.Color,
				Brand:    garmentDb.Brand,
				Price:    garmentDb.Price,
				Comment:  garmentDb.Comment,
				Defects:  garmentDb.Defects,
			}
		}

		garmentTotal, _ := strconv.Atoi(order.GarmentTotal)

		ordersDb[i] = Order{
			ID:                order.ID,
			Identifier:        strconv.Itoa(int(order.Identifier)),
			RecievedDate:      order.RecievedDate.Format(time.RFC3339),
			DeliveryDate:      order.DeliveryDate.Format(time.RFC3339),
			ClientName:        order.ClientName,
			ClientID:          order.ClientID,
			ClientAddress:     order.ClientAddress,
			ClientPhone:       order.ClientPhone,
			ClientEmail:       order.ClientEmail,
			GarmentTotal:      garmentTotal,
			PaymentTotalPayed: order.PaymentTotalPayed,
			PaymentTotal:      order.PaymentTotal,
			PaymentTotalReal:  order.PaymentTotalReal,
			Garments:          garments,
		}
	}
	return ordersDb
}

func (s *OrderService) GetOrderByIdentifier(identifier string, limit int32, offset int32) []Order {
	identifierStr, err := strconv.Atoi(identifier)

	if err != nil {
		return []Order{}
	}
	filterParams := db.GetOrdersByIdentifierParams{
		Identifier: int32(identifierStr),
		Limit:      limit,
		Offset:     offset,
	}

	orders, err := s.store.GetOrdersByIdentifier(context.Background(), filterParams)
	if err != nil {
		log.Fatal("error getting order by identifier ", err)
	}

	ordersDb := make([]Order, len(orders))

	for i := 0; i < len(orders); i++ {
		order := orders[i]

		garmentsDb, _ := s.store.ListGarmentsByOrder(context.Background(), order.ID)
		garments := make([]Garment, len(garmentsDb))
		for j := 0; j < len(garmentsDb); j++ {
			garmentDb := garmentsDb[j]
			garments[j] = Garment{
				ID:       garmentDb.ID,
				OrderID:  garmentDb.OrderID,
				Cuantity: garmentDb.Cuantity,
				Category: garmentDb.Category,
				Gendre:   garmentDb.Gendre,
				Color:    garmentDb.Color,
				Brand:    garmentDb.Brand,
				Price:    garmentDb.Price,
				Comment:  garmentDb.Comment,
				Defects:  garmentDb.Defects,
			}
		}

		garmentTotal, _ := strconv.Atoi(order.GarmentTotal)

		ordersDb[i] = Order{
			ID:                order.ID,
			Identifier:        strconv.Itoa(int(order.Identifier)),
			RecievedDate:      order.RecievedDate.Format(time.RFC3339),
			DeliveryDate:      order.DeliveryDate.Format(time.RFC3339),
			ClientName:        order.ClientName,
			ClientID:          order.ClientID,
			ClientAddress:     order.ClientAddress,
			ClientPhone:       order.ClientPhone,
			ClientEmail:       order.ClientEmail,
			GarmentTotal:      garmentTotal,
			PaymentTotalPayed: order.PaymentTotalPayed,
			PaymentTotal:      order.PaymentTotal,
			PaymentTotalReal:  order.PaymentTotalReal,
			Garments:          garments,
		}
	}
	return ordersDb
}

func (s *OrderService) GetOrdersList(limit int32, offset int32) []Order {
	listParams := db.ListOrdersParams{
		Limit:  limit,
		Offset: offset,
	}
	orders, err := s.store.ListOrders(context.Background(), listParams)
	if err != nil {
		log.Fatal("error getting orders list", err)
	}

	ordersDb := make([]Order, len(orders))

	for i := 0; i < len(orders); i++ {
		order := orders[i]

		garmentsDb, _ := s.store.ListGarmentsByOrder(context.Background(), order.ID)
		garments := make([]Garment, len(garmentsDb))
		for j := 0; j < len(garmentsDb); j++ {
			garmentDb := garmentsDb[j]
			garments[j] = Garment{
				ID:       garmentDb.ID,
				OrderID:  garmentDb.OrderID,
				Cuantity: garmentDb.Cuantity,
				Category: garmentDb.Category,
				Gendre:   garmentDb.Gendre,
				Color:    garmentDb.Color,
				Brand:    garmentDb.Brand,
				Price:    garmentDb.Price,
				Comment:  garmentDb.Comment,
				Defects:  garmentDb.Defects,
			}
		}

		garmentTotal, _ := strconv.Atoi(order.GarmentTotal)

		ordersDb[i] = Order{
			ID:                order.ID,
			Identifier:        strconv.Itoa(int(order.Identifier)),
			RecievedDate:      order.RecievedDate.Format(time.RFC3339),
			DeliveryDate:      order.DeliveryDate.Format(time.RFC3339),
			ClientName:        order.ClientName,
			ClientID:          order.ClientID,
			ClientAddress:     order.ClientAddress,
			ClientPhone:       order.ClientPhone,
			ClientEmail:       order.ClientEmail,
			GarmentTotal:      garmentTotal,
			PaymentTotalPayed: order.PaymentTotalPayed,
			PaymentTotal:      order.PaymentTotal,
			PaymentTotalReal:  order.PaymentTotalReal,
			Garments:          garments,
		}
	}
	return ordersDb
}
