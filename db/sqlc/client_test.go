package db

import (
	"context"
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/require"
)

func TestCreateClient(t *testing.T) {
	arg := createClientParams{
		ID:      uuid.New(),
		Name:    "happy",
		Phone:   "1234",
		Address: "4567",
	}

	client, err := testQueries.createClient(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, client)
	require.Equal(t, arg.Name, client.Name)
	require.Equal(t, arg.Phone, client.Phone)
	require.Equal(t, arg.Address, client.Address)
	require.NotEmpty(t, client.ID)
}
