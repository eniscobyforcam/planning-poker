package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/eniscobyforcam/planning-poker-api/pkg/service"
	"github.com/eniscobyforcam/planning-poker-api/pkg/transport"
)

func main() {
	// read configuration from executable flags
	var port int
	var httpRoot string

	flag.IntVar(&port, "port", 8080, "Port number, default = 8080")
	flag.StringVar(&httpRoot, "httpRoot", "static", "Directory containing static files to be served under /, default='static'")
	flag.Parse()

	// spin up repository
	actions := make(chan service.ActionMessage, 100)
	service.NewRoomRepository(actions)

	// configure handlers for UI-module
	httpRoot = strings.TrimRight(httpRoot, "/")
	http.Handle("/", http.FileServer(http.Dir(httpRoot)))
	http.Handle("/static/css/", http.StripPrefix("/static/css", http.FileServer(http.Dir(fmt.Sprintf("%v/static/css", httpRoot)))))
	http.Handle("/static/js/", http.StripPrefix("/static/js", http.FileServer(http.Dir(fmt.Sprintf("%v/static/js", httpRoot)))))

	// configure websocket endpoint handler
	http.HandleFunc("/endpoint/", transport.MakeHandler(actions))

	// start server
	log.Printf("Starting server on http://localhost:%v", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%v", port), nil))
}
