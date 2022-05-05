package service

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"database/sql"
	"log"
	"math"
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
	ServiceType       string    `json:"service_type"`
	PayedAt           string    `json:"payed_at"`
	DeliveredAt       string    `json:"delivered_at"`
	Garments          []Garment `json:"garments"`
}

func (s *OrderService) CreateOrder(arg Order, mock bool) Order {
	deliveryDate, err := time.Parse(time.RFC3339, arg.DeliveryDate)
	payed_at := sql.NullTime{
		Valid: false,
	}

	if err != nil {
		log.Panic("error parsing date", err)
	}
	paymentTotal, errPt := strconv.Atoi(arg.PaymentTotal)
	paymentTotalPayed, errPtp := strconv.Atoi(arg.PaymentTotalPayed)

	if errPt != nil || errPtp != nil {
		log.Panic("error parsing totals to int", errPt, errPtp)
	}
	paymentTotalReal := paymentTotal - paymentTotalPayed
	if paymentTotalReal == 0 {
		payed_at.Time = time.Now()
		payed_at.Valid = true
	}

	garments := make([]db.CreateGarmentTxParams, len(arg.Garments))
	for i := 0; i < len(arg.Garments); i++ {
		argG := arg.Garments[i]
		garments[i] = db.CreateGarmentTxParams{
			Cuantity:    argG.Cuantity,
			Category:    argG.Category,
			Gendre:      argG.Gendre,
			Color:       argG.Color,
			Brand:       argG.Brand,
			Price:       argG.Price,
			Comment:     argG.Comment,
			Defects:     argG.Defects,
			ServiceType: argG.ServiceType,
		}
	}

	order, err := s.store.CreateOrderTx(context.Background(), mock, db.CreateOrderTxParams{
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
		ServiceType:       arg.ServiceType,
		Garments:          garments,
		PayedAt:           payed_at,
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
			OrderID:     argG.OrderID,
			Cuantity:    argG.Cuantity,
			Category:    argG.Category,
			Gendre:      argG.Gendre,
			Color:       argG.Color,
			Brand:       argG.Brand,
			Price:       argG.Price,
			Comment:     argG.Comment,
			Defects:     argG.Defects,
			ServiceType: argG.ServiceType,
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

	ordersData, err := s.store.GetOrdersByClientName(context.Background(), filterParams)
	if err != nil {
		log.Fatal("error getting order by name", err)
	}

	orders := make([]Order, len(ordersData))

	for i := 0; i < len(ordersData); i++ {
		orders[i] = s.toOrder(ordersData[i])
	}
	return orders
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

	ordersData, err := s.store.GetOrdersByIdentifier(context.Background(), filterParams)
	if err != nil {
		log.Fatal("error getting order by identifier ", err)
	}

	orders := make([]Order, len(ordersData))

	for i := 0; i < len(ordersData); i++ {
		orders[i] = s.toOrder(ordersData[i])
	}
	return orders
}

func (s *OrderService) GetOrdersList(limit int32, offset int32) []Order {
	listParams := db.ListOrdersParams{
		Limit:  limit,
		Offset: offset,
	}
	ordersData, err := s.store.ListOrders(context.Background(), listParams)
	if err != nil {
		log.Fatal("error getting orders list", err)
	}

	orders := make([]Order, len(ordersData))

	for i := 0; i < len(ordersData); i++ {
		orders[i] = s.toOrder(ordersData[i])
	}
	return orders
}

func (s *OrderService) SetOrderDateAt(ID uuid.UUID, arg string, function string) Order {
	var (
		order Order
	)
	if function == "payed_at" {
		order = s.setOrderPayedAt(ID, arg)
	}
	if function == "delivered_at" {
		order = s.setOrderDeliveredAt(ID, arg)
	}

	return order
}

func (s *OrderService) setOrderDeliveredAt(ID uuid.UUID, arg string) Order {
	var (
		order  Order
		result db.Order
		setErr error
		date   time.Time = time.Now()
	)

	if parse, err := time.Parse(time.RFC3339, arg); err == nil {
		date = parse
	}

	result, setErr = s.store.SetOrderDeliveredAt(context.Background(), db.SetOrderDeliveredAtParams{
		ID: ID,
		DeliveredAt: sql.NullTime{
			Time:  date,
			Valid: true,
		},
	})

	if setErr != nil {
		log.Fatal("error setting deliveredAt", setErr)
	}
	order = s.toOrder(result)

	return order
}

func (s *OrderService) setOrderPayedAt(ID uuid.UUID, arg string) Order {
	var (
		order  Order
		result db.Order
		setErr error
		date   time.Time = time.Now()
	)

	if parse, err := time.Parse(time.RFC3339, arg); err == nil {
		date = parse
	}

	result, setErr = s.store.SetOrderPayedAt(context.Background(), db.SetOrderPayedAtParams{
		ID: ID,
		PayedAt: sql.NullTime{
			Time:  date,
			Valid: true,
		},
	})

	if setErr != nil {
		log.Fatal("error setting payedAt", setErr)
	}
	order = s.toOrder(result)

	return order
}

type OrderPagination struct {
	Orders                []Order `json:"orders"`
	Pages                 int64   `json:"pages"`
	PaymentPending        string  `json:"payment_pending"`
	PaymentRecolected     string  `json:"payment_recolected"`
	OrdersPaymentPending  string  `json:"orders_payment_pending"`
	OrdersDeliveryPending string  `json:"orders_delivery_pending"`
	OrdersPaymentDone     string  `json:"orders_payment_done"`
	OrdersDeliveryDone    string  `json:"orders_delivery_done"`
}

func (s *OrderService) ListOrdersByRange(startArg string, endArg string, limit int32, page int32, function string) OrderPagination {
	var (
		orderPagination OrderPagination
		payPending      float64
		PayRecolected   float64
	)
	if function == "created_at" {
		orderPagination = s.listOrdersByCreatedAtRange(startArg, endArg, limit, page)
	}

	if function == "delivered_at" {
		orderPagination = s.listOrdersByDeliveredAtRange(startArg, endArg, limit, page)
	}

	if function == "payed_at" {
		orderPagination = s.listOrdersByPayedAtRange(startArg, endArg, limit, page)
	}

	for _, order := range orderPagination.Orders {
		if val, err := strconv.ParseFloat(order.PaymentTotalReal, 32); err == nil {
			payPending += val
		}
		if val, err := strconv.ParseFloat(order.PaymentTotalPayed, 32); err == nil {
			PayRecolected += val
		}
	}

	return orderPagination
}

func (s *OrderService) listOrdersByCreatedAtRange(startArg string, endArg string, limit int32, page int32) OrderPagination {
	var (
		result                []Order
		orders                []db.Order
		start                 time.Time = time.Now()
		end                   time.Time = time.Now().AddDate(0, 0, 1)
		pages                 int64
		paymentRecolected     string
		paymentPending        string
		ordersPaymentPending  string
		ordersDeliveryPending string
		ordersPaymentDone     string
		ordersDeliveryDone    string
	)

	if parse, err := time.Parse(time.RFC3339, startArg); err == nil {
		start = parse
	}

	if parse, err := time.Parse(time.RFC3339, endArg); err == nil {
		end = parse
	}

	if page > 0 {
		page--
	}

	orders, err := s.store.ListOrdersByCreatedAtRange(context.Background(), db.ListOrdersByCreatedAtRangeParams{
		StartAt:   start,
		EndAt:     end,
		OffsetArg: limit * page,
		LimitArg:  limit,
	})

	if err != nil {
		log.Fatal("error filtering order by created at range", err)
	}

	if data, err := s.store.GetOrdersByCreatedAtRangePages(context.Background(), db.GetOrdersByCreatedAtRangePagesParams{
		StartAt: start,
		EndAt:   end,
	}); err == nil {
		calc := float64(data) / float64(limit)
		pages = int64(math.Ceil(calc))
	}

	result = make([]Order, len(orders))
	for i, order := range orders {
		result[i] = s.toOrder(order)
	}

	if data, err := s.store.GetOrdersByCreatedAtRangeReports(context.Background(), db.GetOrdersByCreatedAtRangeReportsParams{
		StartAt: start,
		EndAt:   end,
	}); err == nil {
		paymentPending = data.PaymentPending
		paymentRecolected = data.PaymentRecolected
		ordersPaymentPending = data.OrdersPaymentPending
		ordersDeliveryPending = data.OrdersDeliveryPending
		ordersPaymentDone = data.OrdersPaymentDone
		ordersDeliveryDone = data.OrdersDeliveryDone
	} else {
		log.Fatal(err)
	}

	return OrderPagination{
		Orders:                result,
		Pages:                 pages,
		PaymentPending:        paymentPending,
		PaymentRecolected:     paymentRecolected,
		OrdersPaymentPending:  ordersPaymentPending,
		OrdersDeliveryPending: ordersDeliveryPending,
		OrdersPaymentDone:     ordersPaymentDone,
		OrdersDeliveryDone:    ordersDeliveryDone,
	}
}

func (s *OrderService) listOrdersByPayedAtRange(startArg string, endArg string, limit int32, page int32) OrderPagination {
	var (
		result                []Order
		orders                []db.Order
		start                 time.Time = time.Now()
		end                   time.Time = time.Now().AddDate(0, 0, 1)
		pages                 int64
		paymentPending        string
		paymentRecolected     string
		ordersPaymentPending  string
		ordersDeliveryPending string
		ordersPaymentDone     string
		ordersDeliveryDone    string
	)

	if parse, err := time.Parse(time.RFC3339, startArg); err == nil {
		start = parse
	}

	if parse, err := time.Parse(time.RFC3339, endArg); err == nil {
		end = parse
	}

	if page > 0 {
		page--
	}

	orders, err := s.store.ListOrdersByPayedAtRange(context.Background(), db.ListOrdersByPayedAtRangeParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
		OffsetArg: limit * page,
		LimitArg:  limit,
	})

	if err != nil {
		log.Fatal("error filtering order by created at range", err)
	}

	if data, err := s.store.GetOrdersByPayedAtRangePages(context.Background(), db.GetOrdersByPayedAtRangePagesParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
	}); err == nil {
		calc := float64(data) / float64(limit)
		pages = int64(math.Ceil(calc))
	}

	result = make([]Order, len(orders))
	for i, order := range orders {
		result[i] = s.toOrder(order)
	}

	if data, err := s.store.GetOrdersByPayedAtRangeReports(context.Background(), db.GetOrdersByPayedAtRangeReportsParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
	}); err == nil {
		paymentPending = data.PaymentPending
		paymentRecolected = data.PaymentRecolected
		ordersPaymentPending = data.OrdersPaymentPending
		ordersDeliveryPending = data.OrdersDeliveryPending
		ordersPaymentDone = data.OrdersPaymentDone
		ordersDeliveryDone = data.OrdersDeliveryDone
	}

	return OrderPagination{
		Orders:                result,
		Pages:                 pages,
		PaymentPending:        paymentPending,
		PaymentRecolected:     paymentRecolected,
		OrdersPaymentPending:  ordersPaymentPending,
		OrdersDeliveryPending: ordersDeliveryPending,
		OrdersPaymentDone:     ordersPaymentDone,
		OrdersDeliveryDone:    ordersDeliveryDone,
	}
}

func (s *OrderService) listOrdersByDeliveredAtRange(startArg string, endArg string, limit int32, page int32) OrderPagination {
	var (
		result                []Order
		orders                []db.Order
		start                 time.Time = time.Now()
		end                   time.Time = time.Now().AddDate(0, 0, 1)
		pages                 int64
		paymentPending        string
		paymentRecolected     string
		ordersPaymentPending  string
		ordersDeliveryPending string
		ordersPaymentDone     string
		ordersDeliveryDone    string
	)

	if parse, err := time.Parse(time.RFC3339, startArg); err == nil {
		start = parse
	}

	if parse, err := time.Parse(time.RFC3339, endArg); err == nil {
		end = parse
	}

	if page > 0 {
		page--
	}

	orders, err := s.store.ListOrdersByDeliveredAtRange(context.Background(), db.ListOrdersByDeliveredAtRangeParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
		OffsetArg: limit * page,
		LimitArg:  limit,
	})

	if err != nil {
		log.Fatal("error filtering order by created at range", err)
	}

	if data, err := s.store.GetOrdersByDeliveredAtRangePages(context.Background(), db.GetOrdersByDeliveredAtRangePagesParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
	}); err == nil {
		calc := float64(data) / float64(limit)
		pages = int64(math.Ceil(calc))
	}

	result = make([]Order, len(orders))
	for i, order := range orders {
		result[i] = s.toOrder(order)
	}

	if data, err := s.store.GetOrdersByDeliveredAtRangeReports(context.Background(), db.GetOrdersByDeliveredAtRangeReportsParams{
		StartAt: sql.NullTime{
			Time:  start,
			Valid: true,
		},
		EndAt: sql.NullTime{
			Time:  end,
			Valid: true,
		},
	}); err == nil {
		paymentPending = data.PaymentPending
		paymentRecolected = data.PaymentRecolected
		ordersPaymentPending = data.OrdersPaymentPending
		ordersDeliveryPending = data.OrdersDeliveryPending
		ordersPaymentDone = data.OrdersPaymentDone
		ordersDeliveryDone = data.OrdersDeliveryDone
	}

	return OrderPagination{
		Orders:                result,
		Pages:                 pages,
		PaymentPending:        paymentPending,
		PaymentRecolected:     paymentRecolected,
		OrdersPaymentPending:  ordersPaymentPending,
		OrdersDeliveryPending: ordersDeliveryPending,
		OrdersPaymentDone:     ordersPaymentDone,
		OrdersDeliveryDone:    ordersDeliveryDone,
	}
}

func (s *OrderService) toOrder(order db.Order) Order {
	var (
		payedAt      string
		deliveredAt  string
		garmentTotal int
		garments     []Garment
	)

	garmentData, _ := s.store.ListGarmentsByOrder(context.Background(), order.ID)
	garments = make([]Garment, len(garmentData))
	for j := 0; j < len(garmentData); j++ {
		garment := garmentData[j]
		garments[j] = Garment{
			ID:          garment.ID,
			OrderID:     garment.OrderID,
			Cuantity:    garment.Cuantity,
			Category:    garment.Category,
			Gendre:      garment.Gendre,
			Color:       garment.Color,
			Brand:       garment.Brand,
			Price:       garment.Price,
			Comment:     garment.Comment,
			Defects:     garment.Defects,
			ServiceType: garment.ServiceType,
		}
	}

	garmentTotal, err := strconv.Atoi(order.GarmentTotal)

	if err != nil {
		log.Fatal("error Atoi garmentTotal ", err)
	}

	if order.PayedAt.Valid {
		payedAt = order.PayedAt.Time.Format(time.RFC3339)
	}

	if order.DeliveredAt.Valid {
		deliveredAt = order.DeliveredAt.Time.Format(time.RFC3339)
	}

	return Order{
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
		PayedAt:           payedAt,
		DeliveredAt:       deliveredAt,
	}
}
