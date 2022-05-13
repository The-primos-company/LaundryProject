package service

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"

	"github.com/google/uuid"
)

// OrderService struct
type GarmentService struct {
	store *db.Store
}

func newGarmentService(store *db.Store) GarmentService {
	return GarmentService{
		store: store,
	}
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
	ServiceType string    `json:"service_type"`
}

type SumaryGarmentsResults struct {
	ID          int    `json:"id"`
	Cuantity    int64  `json:"cuantity"`
	Category    string `json:"category"`
	ServiceType string `json:"service_type"`
	PriceTotal  string `json:"price_total"`
	CostTotal   string `json:"cost_total"`
	Utilities   string `json:"utilities"`
}

func (s *GarmentService) GetSumaryGarments(startArg string, endArg string) []SumaryGarmentsResults {
	reports := s.store.SumaryGarmentsStore(context.Background(), db.SumaryGarmentsArgs{
		StartAt: startArg,
		EndAt:   endArg,
	})

	result := make([]SumaryGarmentsResults, len(reports))

	for i := range reports {
		result[i] = SumaryGarmentsResults{
			ID:          i,
			Cuantity:    reports[i].Cuantity,
			Category:    reports[i].Category,
			ServiceType: reports[i].ServiceType,
			PriceTotal:  reports[i].PriceTotal,
			CostTotal:   reports[i].CostTotal,
			Utilities:   reports[i].Utilities,
		}
	}

	return result

}
