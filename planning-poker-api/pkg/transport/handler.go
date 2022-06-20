package transport

import (
	"encoding/json"
	"github.com/eniscobyforcam/planning-poker-api/pkg/service"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// we accept all origins
var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func feedbackHandler(feedback chan service.ResponseMessage, conn *websocket.Conn) {
	for {
		event, ok := <-feedback
		if !ok {
			break
		}

		response, err := json.Marshal(event)

		if err != nil {
			log.Printf("Failed marshalling error response: %v\n", err)
			break
		}

		conn.WriteMessage(websocket.TextMessage, response)
	}
}

// MakeHandler creates a websocket adapter between the room repository and the UI
func MakeHandler(channel chan service.ActionMessage) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		// http -> websocket protocol upgrade
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Printf("Error during connection upgrade: %v\n", err)
			return
		}
		defer conn.Close()

		// start feedback handler go routine
		feedback := make(chan service.ResponseMessage, 100)
		defer close(feedback)
		go feedbackHandler(feedback, conn)

		var lastJoinMessage *service.ActionMessage
		for {
			// receive messages from client
			messageType, rawMessage, err := conn.ReadMessage()

			// end handler on error
			if err != nil {
				break
			}

			if messageType == websocket.TextMessage {
				var message service.ActionMessage
				err := json.Unmarshal(rawMessage, &message)

				if err != nil {
					log.Printf("Failed unmarshalling message: %v\n", err)
				}


				switch message.Action {
				case service.JoinRoomAction:
					lastJoinMessage = &message
					message.Feedback = feedback
				case service.CreateRoomAction:
					message.Feedback = feedback
				}

				channel <- message
			}
		}

		if lastJoinMessage != nil {
			log.Printf("%v left\n", lastJoinMessage.Name)
			lastJoinMessage.Action = service.LeaveRoomAction
			channel <- *lastJoinMessage
		}
	}
}
