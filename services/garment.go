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
	Data            []SumaryGarment `json:"data"`
	TotalGarments   int64           `json:"total_garments"`
	TotalPriceTotal string          `json:"total_price_total"`
	TotalCost       string          `json:"total_cost"`
	TotalUtilities  string          `json:"total_utilities"`
}

type SumaryGarment struct {
	ID          int    `json:"id"`
	Cuantity    int64  `json:"cuantity"`
	Category    string `json:"category"`
	ServiceType string `json:"service_type"`
	PriceTotal  string `json:"price_total"`
	CostTotal   string `json:"cost_total"`
	Utilities   string `json:"utilities"`
}

func (s *GarmentService) GetSumaryGarments(startArg string, endArg string) SumaryGarmentsResults {
	reports := s.store.SumaryGarmentsStore(context.Background(), db.SumaryGarmentsArgs{
		StartAt: startArg,
		EndAt:   endArg,
	})

	result := make([]SumaryGarment, len(reports.Data))

	for i := range reports.Data {
		result[i] = SumaryGarment{
			ID:          i,
			Cuantity:    reports.Data[i].Cuantity,
			Category:    reports.Data[i].Category,
			ServiceType: reports.Data[i].ServiceType,
			PriceTotal:  reports.Data[i].PriceTotal,
			CostTotal:   reports.Data[i].CostTotal,
			Utilities:   reports.Data[i].Utilities,
		}
	}

	return SumaryGarmentsResults{
		Data:            result,
		TotalGarments:   reports.TotalGarments,
		TotalPriceTotal: reports.TotalPriceTotal,
		TotalCost:       reports.TotalCost,
		TotalUtilities:  reports.TotalUtilities,
	}

}
