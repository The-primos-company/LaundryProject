// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0

package db

import (
	"time"

	"github.com/google/uuid"
)

type Garment struct {
	ID        uuid.UUID `json:"id"`
	OrderID   uuid.UUID `json:"order_id"`
	Cuantity  string    `json:"cuantity"`
	Category  string    `json:"category"`
	Gendre    string    `json:"gendre"`
	Color     string    `json:"color"`
	Brand     string    `json:"brand"`
	Price     string    `json:"price"`
	Comment   string    `json:"comment"`
	Defects   string    `json:"defects"`
	CreatedAt time.Time `json:"created_at"`
}

type Order struct {
	ID                uuid.UUID `json:"id"`
	Identifier        int32     `json:"identifier"`
	RecievedDate      time.Time `json:"recieved_date"`
	DeliveryDate      time.Time `json:"delivery_date"`
	ClientName        string    `json:"client_name"`
	ClientID          string    `json:"client_id"`
	ClientAddress     string    `json:"client_address"`
	ClientPhone       string    `json:"client_phone"`
	ClientEmail       string    `json:"client_email"`
	GarmentTotal      string    `json:"garment_total"`
	PaymentTotalPayed string    `json:"payment_total_payed"`
	PaymentTotal      string    `json:"payment_total"`
	PaymentTotalReal  string    `json:"payment_total_real"`
	CreatedAt         time.Time `json:"created_at"`
}
