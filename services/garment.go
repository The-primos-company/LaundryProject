package service

import (
	db "The_primos_company/project_L/db/sqlc"

	"github.com/google/uuid"
)

// OrderService struct
type GarmentService struct {
	store *db.Store
}

func newGarmentService(store *db.Store) OrderService {
	return OrderService{
		store: store,
	}
}

type Garment struct {
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
