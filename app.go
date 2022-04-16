package main

import (
	db "The_primos_company/project_L/db/sqlc"
	service "The_primos_company/project_L/services"
	"context"
	"database/sql"
	"log"
)

// App struct
type App struct {
	ctx      context.Context
	store    *db.Store
	services []interface{}
}

// NewApp creates a new App application struct
func NewApp() *App {
	// Create an instance of the app structure
	dataBase, err := sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store := db.NewStore(dataBase)
	services := service.NewServices(store)

	app := &App{
		store:    store,
		services: services,
	}
	return app
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	a.ctx = ctx
}

// domReady is called after the front-end dom has been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}
