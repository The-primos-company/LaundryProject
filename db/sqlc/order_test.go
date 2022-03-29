package db

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestCreateOrder(t *testing.T) {
	argcl := createClientParams{
		ID:      uuid.New(),
		Name:    "happy",
		Phone:   "1234",
		Address: "4567",
	}

	client, err := testQueries.CreateClient(context.Background(), argcl)
	require.NoError(t, err)
	require.NotEmpty(t, client)

	argOr := CreateOrderParams{
		ID:           uuid.New(),
		Identifier:   1,
		RecievedDate: time.Now(),
		DeliveryDate: time.Now(),
		ClientID:     client.ID,
		CreatedAt:    time.Now(),
	}

	order, err := testQueries.CreateOrder(context.Background(), argOr)
	require.NoError(t, err)
	require.NotEmpty(t, order)
	require.Equal(t, argOr.Identifier, order.Identifier)
	//require.Equal(t, argOr.RecievedDate, order.RecievedDate)
	//require.Equal(t, argOr.DeliveryDate, order.DeliveryDate)
	require.Equal(t, argOr.ClientID, order.ClientID)
	//require.Equal(t, argOr.CreatedAt, order.CreatedAt)
	require.NotEmpty(t, order.ID)
}
