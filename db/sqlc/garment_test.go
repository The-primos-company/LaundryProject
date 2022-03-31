package db

import (
	"context"
	"fmt"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestCreateGarment(t *testing.T) {

	argOr := CreateOrderParams{
		ID:                uuid.New(),
		RecievedDate:      time.Now(),
		DeliveryDate:      time.Now(),
		ClientName:        "Gokusita",
		ClientID:          "1234123",
		ClientAddress:     "av siempre viva",
		ClientPhone:       "124123",
		ClientEmail:       "gokusita@lamejor.com",
		GarmentTotal:      "123",
		PaymentTotalPayed: "10000",
		PaymentTotal:      "20000",
		PaymentTotalReal:  "10000",
	}

	order, err := testQueries.CreateOrder(context.Background(), argOr)
	require.NoError(t, err)
	require.NotEmpty(t, order)

	argGar := CreateGarmentParams{
		ID:       uuid.New(),
		OrderID:  order.ID,
		Cuantity: "10230",
		Category: "jacket",
		Gendre:   "male",
		Color:    "red",
		Brand:    "Gucci",
		Price:    "1234",
		Comment:  "bad bad",
		Defects:  "picado-rasgado-decolorado",
	}

	garment, errGar := testQueries.CreateGarment(context.Background(), argGar)
	require.NoError(t, errGar)
	require.NotEmpty(t, garment)
	require.Equal(t, order.ID, garment.OrderID)
}

func TestGetGarmentByOrderId(t *testing.T) {

	argOr := CreateOrderParams{
		ID:                uuid.New(),
		RecievedDate:      time.Now(),
		DeliveryDate:      time.Now(),
		ClientName:        "Gokusita",
		ClientID:          "1234123",
		ClientAddress:     "av siempre viva",
		ClientPhone:       "124123",
		ClientEmail:       "gokusita@lamejor.com",
		GarmentTotal:      "123",
		PaymentTotalPayed: "10000",
		PaymentTotal:      "20000",
		PaymentTotalReal:  "10000",
	}

	order, err := testQueries.CreateOrder(context.Background(), argOr)
	require.NoError(t, err)
	require.NotEmpty(t, order)

	for i := 0; i < 10; i++ {
		argGar := CreateGarmentParams{
			ID:       uuid.New(),
			OrderID:  order.ID,
			Cuantity: "10230",
			Category: fmt.Sprintf("jacket %d", i),
			Gendre:   "male",
			Color:    "red",
			Brand:    "Gucci",
			Price:    "1234",
			Comment:  "bad bad",
			Defects:  "picado-rasgado-decolorado",
		}

		garment, errGar := testQueries.CreateGarment(context.Background(), argGar)
		require.NoError(t, errGar)
		require.NotEmpty(t, garment)
		require.Equal(t, order.ID, garment.OrderID)
	}
	listArgs := ListGarmentsByOrderParams{
		Limit:   10,
		Offset:  0,
		OrderID: order.ID,
	}
	garments, errList := testQueries.ListGarmentsByOrder(context.Background(), listArgs)
	require.NoError(t, errList)
	require.NotEmpty(t, garments)

	for i := 0; i < len(garments); i++ {
		fmt.Println(garments[i].Category)
	}
	require.Equal(t, 10, len(garments))
}
