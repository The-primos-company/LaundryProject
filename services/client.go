package service

import (
	db "The_primos_company/project_L/db/sqlc"
	"context"
	"log"
	"time"

	"github.com/google/uuid"
)

// ClientService struct
type ClientService struct {
	store *db.Store
}

func newClientService(store *db.Store) ClientService {
	return ClientService{
		store: store,
	}
}

type Client struct {
	ID             uuid.UUID `json:"id"`
	Name           string    `json:"name"`
	Identification string    `json:"identification"`
	Address        string    `json:"address"`
	Phone          string    `json:"phone"`
	Email          string    `json:"email"`
	CreatedAt      time.Time `json:"created_at"`
}

func (s *ClientService) CreateClient(arg Client) Client {
	client, err := s.store.CreateClient(context.Background(), db.CreateClientParams{
		ID:             uuid.New(),
		Name:           arg.Name,
		Identification: arg.Identification,
		Address:        arg.Address,
		Phone:          arg.Phone,
		Email:          arg.Email,
	})

	if err != nil {
		log.Panic("error creating client", err)
	}
	return Client(client)
}

func (s *ClientService) GetClientsByIdentification(identification string, limit int32, offset int32) []Client {
	result, err := s.store.GetClientByIdentification(context.Background(), db.GetClientByIdentificationParams{
		Identification: identification,
		Limit:          limit,
		Offset:         offset,
	})

	if err != nil {
		log.Fatal("error getting client by identification", err)
	}

	clients := make([]Client, len(result))

	for i := 0; i < len(result); i++ {
		clients[i] = Client(result[i])
	}
	return clients
}

func (s *ClientService) GetClientsByName(name string, limit int32, offset int32) []Client {
	result, err := s.store.GetClientByName(context.Background(), db.GetClientByNameParams{
		Name:   name,
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		log.Fatal("error getting clients by name", err)
	}

	clients := make([]Client, len(result))

	for i := 0; i < len(result); i++ {
		clients[i] = Client(result[i])
	}
	return clients
}

func (s *ClientService) GetClientsList(limit int32, offset int32) []Client {
	result, err := s.store.ListClients(context.Background(), db.ListClientsParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		log.Fatal("error getting Clients list", err)
	}

	clients := make([]Client, len(result))

	for i := 0; i < len(result); i++ {
		clients[i] = Client(result[i])
	}
	return clients
}
