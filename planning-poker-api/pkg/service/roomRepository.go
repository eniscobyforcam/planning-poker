package service

import (
	"fmt"
	"log"
)

type roomData struct {
	votes   map[string]string
	clients map[string]chan ResponseMessage
}

type roomRepository struct {
	rooms map[int]roomData
	input chan ActionMessage
}

func (r roomRepository) eventLoop() {
	for {
		event, ok := <-r.input
		if !ok {
			break
		}

		switch event.Action {
		case CreateRoomAction:
			r.createRoom(event)
		case JoinRoomAction:
			r.joinRoom(event)
		case LeaveRoomAction:
			r.leaveRoom(event)
		case VoteAction:
			r.vote(event)
		case NewRoundAction:
			r.newRound(event)
		}
	}
}

func (r roomRepository) createRoom(msg ActionMessage) {
	no := r.findFreeRoom()

	r.rooms[no] = roomData{
		votes:   make(map[string]string),
		clients: make(map[string]chan ResponseMessage),
	}

	msg.Feedback <- ResponseMessage{Result: NewRoomResult, Room: no + 1}
	log.Printf("created room %v", no+1)
}

func (r roomRepository) findFreeRoom() (result int) {
	result = -1

	for i := 0; result == -1; i++ {
		if _, exists := r.rooms[i]; !exists {
			result = i
		}
	}
	return
}

func (r roomRepository) notify(roomNo int) {
	room := r.rooms[roomNo]

	msg := ResponseMessage{
		Result: VotesResult,
		Room:   roomNo + 1,
		Votes:  room.votes,
	}

	for _, channel := range room.clients {
		channel <- msg
	}
}

func (r roomRepository) joinRoom(msg ActionMessage) {
	index := msg.Room - 1
	room, ok := r.rooms[index]
	if !ok {
		msg.Feedback <- ResponseMessage{Result: ErrorResult, Error: fmt.Sprintf("room %v does not exist", msg.Room)}
		return
	}

	client := room.clients[msg.Name]

	if client != nil {
		msg.Feedback <- ResponseMessage{Result: ErrorResult, Error: fmt.Sprintf("user %v already exists in room %v", msg.Name, msg.Room)}
		return
	}

	room.votes[msg.Name] = ""
	room.clients[msg.Name] = msg.Feedback

	log.Printf("%v joined room %v", msg.Name, msg.Room)

	r.notify(index)
}

func (r roomRepository) leaveRoom(msg ActionMessage) {
	index := msg.Room - 1
	room, found := r.rooms[index]

	if !found {
		return
	}

	delete(room.clients, msg.Name)
	delete(room.votes, msg.Name)

	if len(room.clients) > 0 {
		r.notify(index)
	} else {
		log.Printf("Destroying room %v\n", msg.Room)
		delete(r.rooms, index)
	}
}

func (r roomRepository) vote(msg ActionMessage) {
	room, found := r.rooms[msg.Room-1]

	if !found {
		return
	}

	room.votes[msg.Name] = msg.Points

	r.notify(msg.Room - 1)
}

func (r roomRepository) newRound(msg ActionMessage) {
	room, found := r.rooms[msg.Room-1]

	if !found {
		return
	}

	for name := range room.votes {
		room.votes[name] = ""
	}

	r.notify(msg.Room - 1)
}

// NewRoomRepository creates a new repository with configurable size
func NewRoomRepository(input chan ActionMessage) {
	r := roomRepository{
		rooms: make(map[int]roomData),
		input: input,
	}
	go r.eventLoop()
}
