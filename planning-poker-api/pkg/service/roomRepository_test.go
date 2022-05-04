package service

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const name = "name"

func Test_EventLoop(t *testing.T) {
	t.Parallel()

	t.Run("Create room message responds with new room", testCreateRoomMessageRespondsWithNewRoom)
	t.Run("Join room message with non-existing room", testJoinRoomMessageWithNonExistingRoom)
	t.Run("Join room message with existing room", testJoinRoomMessageWithExistingRoom)
	t.Run("Leave room message with existing room", testJoinRoomMessageWithExistingRoom)
	t.Run("Vote message", testVoteMessage)
	t.Run("Leave room message other clients notified", testLeaveRoomOtherClientsNotified)
}

func testLeaveRoomOtherClientsNotified(t *testing.T) {
	input := startRepository()

	feedback1 := make(chan ResponseMessage, 100)
	feedback2 := make(chan ResponseMessage, 100)

	input <- ActionMessage{Action: CreateRoomAction, Feedback: feedback1}
	response := <-feedback1
	room := response.Room

	input <- ActionMessage{
		Action:   JoinRoomAction,
		Room:     room,
		Name:     name,
		Feedback: feedback1,
	}
	response = <-feedback1

	input <- ActionMessage{
		Action:   JoinRoomAction,
		Room:     room,
		Name:     "other",
		Feedback: feedback2,
	}
	response = <-feedback2

	input <- ActionMessage{
		Action: LeaveRoomAction,
		Room:   room,
		Name:   name,
	}

	response, ok := <-feedback2
	assert.True(t, ok)
	assert.Equal(t, VotesResult, response.Result)
	assert.Equal(t, 1, len(response.Votes))

	close(input)
	close(feedback1)
	close(feedback2)
}

func testVoteMessage(t *testing.T) {
	input := startRepository()

	feedback := make(chan ResponseMessage, 100)

	input <- ActionMessage{Action: CreateRoomAction, Feedback: feedback}
	response := <-feedback

	room := response.Room
	input <- ActionMessage{
		Action:   JoinRoomAction,
		Room:     room,
		Name:     name,
		Feedback: feedback,
	}

	response = <-feedback

	input <- ActionMessage{
		Action: VoteAction,
		Room:   room,
		Name:   name,
		Points: "5",
	}

	response, ok := <-feedback
	assert.True(t, ok)
	assert.Equal(t, VotesResult, response.Result)
	assert.Equal(t, room, response.Room)
	assert.Equal(t, "5", response.Votes[name])

	close(feedback)
	close(input)
}

func testJoinRoomMessageWithExistingRoom(t *testing.T) {
	input := startRepository()

	feedback := make(chan ResponseMessage, 100)

	input <- ActionMessage{Action: CreateRoomAction, Feedback: feedback}
	response := <-feedback

	input <- ActionMessage{
		Action:   JoinRoomAction,
		Room:     response.Room,
		Name:     name,
		Feedback: feedback,
	}

	response, ok := <-feedback

	assert.True(t, ok)
	assert.Equal(t, VotesResult, response.Result)

	close(feedback)
	close(input)
}

func testJoinRoomMessageWithNonExistingRoom(t *testing.T) {
	input := startRepository()

	feedback := make(chan ResponseMessage, 100)
	input <- ActionMessage{
		Action:   JoinRoomAction,
		Room:     1,
		Name:     name,
		Feedback: feedback,
	}

	response, ok := <-feedback

	assert.True(t, ok)
	assert.Equal(t, ErrorResult, response.Result)
	assert.Equal(t, "room 1 does not exist", response.Error)

	close(feedback)
	close(input)
}

func testCreateRoomMessageRespondsWithNewRoom(t *testing.T) {
	input := startRepository()

	feedback := make(chan ResponseMessage, 100)
	input <- ActionMessage{Action: CreateRoomAction, Feedback: feedback}

	response, ok := <-feedback

	assert.True(t, ok)
	assert.Equal(t, NewRoomResult, response.Result)

	close(feedback)
	close(input)
}

func startRepository() chan ActionMessage {
	input := make(chan ActionMessage, 100)
	NewRoomRepository(input)
	return input
}
