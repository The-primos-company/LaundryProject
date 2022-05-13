package service

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/google/uuid"
)

// PriceService struct
type PriceService struct {
	store *db.Store
}

func newPriceService(store *db.Store) PriceService {
	return PriceService{
		store: store,
	}
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

func (s *PriceService) CreatePrice(arg Price) Price {
	price, err := s.store.CreatePriceTx(context.Background(), db.CreatePriceTxParams{
		Category:     arg.Category,
		PriceWashing: arg.PriceWashing,
		PriceIroning: arg.PriceIroning,
		PriceDyeing:  arg.PriceDyeing,
		CostWashing:  arg.CostWashing,
		CostIroning:  arg.CostIroning,
		CostDyeing:   arg.CostDyeing,
	})

	if err != nil {
		log.Panic("error creating price", err)
	}

	return Price(price)
}

func (s *PriceService) UpdatePrice(arg Price) Price {
	price, err := s.store.UpdatePriceTx(context.Background(), db.UpdatePriceTxParams{
		ID:           arg.ID,
		Category:     arg.Category,
		PriceWashing: arg.PriceWashing,
		PriceIroning: arg.PriceIroning,
		PriceDyeing:  arg.PriceDyeing,
		CostWashing:  arg.CostWashing,
		CostIroning:  arg.CostIroning,
		CostDyeing:   arg.CostDyeing,
	})

	if err != nil {
		log.Panic("error updating price"+arg.ID.String(), err)
	}

	return Price(price)
}

func (s *PriceService) DeletePrice(id uuid.UUID) bool {
	err := s.store.DeletePrice(context.Background(), id)

	return err == nil
}

func (s *PriceService) GetPricesList(limit int32, offset int32) []Price {
	prices, err := s.store.ListPrices(context.Background(), db.ListPricesParams{
		LimitArg:  limit,
		OffsetArg: offset,
	})

	if err != nil {
		log.Panic("error deleting price", err)
	}

	result := make([]Price, len(prices))

	for i := range prices {
		result[i] = Price(prices[i])
	}
	return result
}

func (s *PriceService) GetPricesByCategory(limit int32, offset int32, category string) []Price {
	prices, err := s.store.ListPricesByCategory(context.Background(), db.ListPricesByCategoryParams{
		LimitArg:  limit,
		OffsetArg: offset,
		Category:  category,
	})

	if err != nil {
		log.Panic("error geting price by category", err)
	}

	result := make([]Price, len(prices))

	for i := range prices {
		result[i] = Price(prices[i])
	}
	return result
}

func (s *PriceService) GetPrices() []Price {
	prices, err := s.store.ListPricesAll(context.Background())

	if err != nil {
		log.Panic("error geting all prices", err)
	}

	result := make([]Price, len(prices))

	for i := range prices {
		result[i] = Price(prices[i])
	}
	return result
}
