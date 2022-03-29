package main

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"log"
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
	ID            uuid.UUID `json:"ID"`
	RecievedDate  time.Time `json:"recieved_date"`
	DeliveryDate  time.Time `json:"delivery_date"`
	ClientName    string    `json:"client_name"`
	ClientID      string    `json:"client_id"`
	ClientAddress string    `json:"client_address"`
	ClientPhone   string    `json:"client_phone"`
	ClientEmail   string    `json:"client_email"`
}

type Client struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
}

func (a *App) CreateOrder(order Order) Order {

	arg := db.CreateOrderParams{
		ID:            uuid.New(),
		RecievedDate:  order.RecievedDate,
		DeliveryDate:  order.DeliveryDate,
		ClientName:    order.ClientName,
		ClientID:      order.ClientID,
		ClientAddress: order.ClientAddress,
		ClientPhone:   order.ClientPhone,
		ClientEmail:   order.ClientEmail,
	}
	createdOrder, err := a.store.CreateOrder(context.Background(), arg)

	if err != nil {
		log.Fatal("error creating order", err)
	}

	return Order{
		ID:            createdOrder.ID,
		RecievedDate:  order.RecievedDate,
		DeliveryDate:  order.DeliveryDate,
		ClientName:    order.ClientName,
		ClientID:      order.ClientID,
		ClientAddress: order.ClientAddress,
		ClientPhone:   order.ClientPhone,
		ClientEmail:   order.ClientEmail,
	}
}
