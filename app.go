package main

import (
	"context"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
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
	Identifier   string  `json:"identifier"`
	RecivedDate  string  `json:"recivedDate"`
	DeliveryDate string  `json:"deliveryDate"`
	Client       *Client `json:"client"`
}

type Client struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Phone   string `json:"phone"`
}

func (a *App) CreateOrder(order Order) Order {
	return order
	//return fmt.Sprintf("Order: (number: %s, recived date: %s, delivery date: %s) Client: (name: %s, address: %s, phone: %s)", order.identifier, order.recivedDate, order.deliveryDate, order.client.name, order.client.address, order.client.phone)
}
