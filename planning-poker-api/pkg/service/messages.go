package service

// Action is an enum defining all available actions.
type Action string

// Response is an enum defining all available responses.
type Response string

const (
	// CreateRoomAction creates a new room and responds with a NewRoomResult.
	CreateRoomAction Action = "CreateRoom"
	// JoinRoomAction makes the user join a room. 
	// It responds with an ErrorResult when the room does not exist or a user with the same name already exists in the room.
	JoinRoomAction   Action = "JoinRoom"
	// LeaveRoomAction makes the user leave a room.
	LeaveRoomAction  Action = "LeaveRoom"
	// VoteAction updates the current vote of a user.
	VoteAction       Action = "Vote"
	// NewRoundAction starts a new voting round.
	NewRoundAction   Action = "NewRound"

	// ErrorResult is sent when joining a room when requested room does not exists or already contains a user with the same name.
	ErrorResult   Response = "Error"
	// NewRoomResult is sent when a new room is created and contains the room number.
	NewRoomResult Response = "NewRoom"
	// VotesResult is sent to all users currently in a room whenever the room status changes.
	VotesResult   Response = "Votes"
)

// ActionMessage is sent by the UI whenever it needs an action from the API.
type ActionMessage struct {
	Action   Action               `json:"action"`
	Room     int                  `json:"room"`
	Name     string               `json:"name"`
	Points   string               `json:"points"`
	Feedback chan ResponseMessage `json:"-"`
}

// ResponseMessage is sent by the API to the UI.
type ResponseMessage struct {
	Result Response          `json:"result"`
	Error  string            `json:"error"`
	Room   int               `json:"room"`
	Votes  map[string]string `json:"votes"`
}
