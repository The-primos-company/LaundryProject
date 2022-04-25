package service

import (
	db "The_primos_company/project_L/db/sqlc"
)

// App struct
type Services interface {
}

func NewServices(store *db.Store) []interface{} {
	services := routing(*store)
	return services
}

func routing(store db.Store) []interface{} {
	orderService := newOrderService(&store)
	garmentService := newGarmentService(&store)
	priceService := newPriceService(&store)
	clientService := newClientService(&store)
	return []interface{}{
		&orderService,
		&garmentService,
		&priceService,
		&clientService,
	}
}
