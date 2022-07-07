// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.14.0

package db

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type Client struct {
	ID             uuid.UUID `json:"id"`
	Name           string    `json:"name"`
	Identification string    `json:"identification"`
	Address        string    `json:"address"`
	Phone          string    `json:"phone"`
	Email          string    `json:"email"`
	CreatedAt      time.Time `json:"created_at"`
}

type Garment struct {
	ID          uuid.UUID `json:"id"`
	OrderID     uuid.UUID `json:"order_id"`
	Cuantity    string    `json:"cuantity"`
	Category    string    `json:"category"`
	Gendre      string    `json:"gendre"`
	Color       string    `json:"color"`
	Brand       string    `json:"brand"`
	Price       string    `json:"price"`
	Comment     string    `json:"comment"`
	Defects     string    `json:"defects"`
	CreatedAt   time.Time `json:"created_at"`
	ServiceType string    `json:"service_type"`
	PriceTotal  string    `json:"price_total"`
}

type Order struct {
	ID                uuid.UUID    `json:"id"`
	Identifier        int32        `json:"identifier"`
	RecievedDate      time.Time    `json:"recieved_date"`
	DeliveryDate      time.Time    `json:"delivery_date"`
	ClientName        string       `json:"client_name"`
	ClientID          string       `json:"client_id"`
	ClientAddress     string       `json:"client_address"`
	ClientPhone       string       `json:"client_phone"`
	ClientEmail       string       `json:"client_email"`
	GarmentTotal      string       `json:"garment_total"`
	PaymentTotalPayed string       `json:"payment_total_payed"`
	PaymentTotal      string       `json:"payment_total"`
	PaymentTotalReal  string       `json:"payment_total_real"`
	CreatedAt         time.Time    `json:"created_at"`
	PayedAt           sql.NullTime `json:"payed_at"`
	DeliveredAt       sql.NullTime `json:"delivered_at"`
	PaymentPaid       string       `json:"payment_paid"`
}

type Price struct {
	ID           uuid.UUID `json:"id"`
	Category     string    `json:"category"`
	PriceWashing string    `json:"price_washing"`
	PriceIroning string    `json:"price_ironing"`
	CreatedAt    time.Time `json:"created_at"`
	PriceDyeing  string    `json:"price_dyeing"`
	CostWashing  string    `json:"cost_washing"`
	CostIroning  string    `json:"cost_ironing"`
	CostDyeing   string    `json:"cost_dyeing"`
}
