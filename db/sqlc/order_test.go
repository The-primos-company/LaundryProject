package db

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestCreateOrder(t *testing.T) {

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
		Comments:          "it is a test",
		PaymentTotalPayed: "10000",
		PaymentTotal:      "20000",
		PaymentTotalReal:  "10000",
	}

	order, err := testQueries.CreateOrder(context.Background(), argOr)
	require.NoError(t, err)
	require.NotEmpty(t, order)
}

func TestGetNextIdentifier(t *testing.T) {

	argOr := CreateOrderParams{
		ID:            uuid.New(),
		RecievedDate:  time.Now(),
		DeliveryDate:  time.Now(),
		ClientName:    "Gokusita",
		ClientID:      "1234123",
		ClientAddress: "av siempre viva",
		ClientPhone:   "124123",
		ClientEmail:   "gokusita@lamejor.com",
	}

	order, err := testQueries.CreateOrder(context.Background(), argOr)
	nextIdentifier, _ := testQueries.GetNextOrderIdentifier(context.Background())
	require.NoError(t, err)
	require.NotEmpty(t, order)
	require.Equal(t, nextIdentifier, order.Identifier+1)
}
