package main

import (
	db "The_primos_company/project_L/db/sqlc"
	service "The_primos_company/project_L/services"
	"context"
	"database/sql"
	"log"

	"github.com/wailsapp/wails/v2/pkg/runtime"
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

func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	dialog, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Cerrar el programa",
		Message:       "¿Está seguro que desea cerrar el programa?",
		DefaultButton: "Sí",
		CancelButton:  "No",
	})

	if err != nil {
		return false
	}
	return dialog != "Yes"
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
