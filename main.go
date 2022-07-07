package main

import (
	"database/sql"
	"embed"

	"github.com/evalphobia/logrus_sentry"
	log "github.com/sirupsen/logrus"
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
	app := NewApp()

	hook, err := logrus_sentry.NewSentryHook("https://9449b777c93c4a0ebc67f12f7b5d7dde@o1239630.ingest.sentry.io/6391217", []log.Level{
		log.PanicLevel,
		log.FatalLevel,
		log.ErrorLevel,
		log.InfoLevel,
	})

	if err == nil {
		log.AddHook(hook)
	}

	// Create application with options
	err = wails.Run(&options.App{
		Title:             "Lavanderia Lava sur",
		Width:             1024,
		Height:            700,
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
		OnBeforeClose:     app.beforeClose,
		Bind:              append(app.services, app),
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
