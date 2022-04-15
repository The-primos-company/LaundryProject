package main

import (
	db "The_primos_company/project_L/db/sqlc"
	"database/sql"
	"embed"
	"log"

	"github.com/wailsapp/wails/v2/pkg/options/mac"

	_ "github.com/lib/pq"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed frontend/build
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

var dataBase *sql.DB

const (
	dbDriver = "postgres"
	dbSource = "postgresql://root:secret@localhost:5432/project-l?sslmode=disable"
)

func main() {
	// Create an instance of the app structure
	dataBase, err := sql.Open(dbDriver, dbSource)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}
	store := db.NewStore(dataBase)
	app := NewApp(store)

	// Create application with options
	err = wails.Run(&options.App{
		Title:  "LaundryProject",
		Width:  1024,
		Height: 700,
		// MinWidth:          720,
		// MinHeight:         570,
		// MaxWidth:          1280,
		// MaxHeight:         740,
		DisableResize:     false,
		Fullscreen:        false,
		Frameless:         false,
		StartHidden:       false,
		HideWindowOnClose: false,
		RGBA:              &options.RGBA{255, 255, 255, 255},
		Assets:            assets,
		LogLevel:          logger.DEBUG,
		OnStartup:         app.startup,
		OnDomReady:        app.domReady,
		OnShutdown:        app.shutdown,
		Bind: []interface{}{
			app,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
		},
		Mac: &mac.Options{
			TitleBar:             mac.TitleBarHiddenInset(),
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "ReactJS Template",
				Message: "Part of the Wails projects",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}
}
