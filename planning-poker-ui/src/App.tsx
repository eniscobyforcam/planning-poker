import {Alert, Snackbar, Stack} from '@mui/material'
import {styled} from '@mui/system'
import React, {useState} from 'react'
import Cards from './Cards'
import Header from './Header'
import RoomSelection from './RoomSelection'
import Round from './Round'
import {useRoom} from './useRoom'
import Welcome from './Welcome'

const Viewport = styled('div')`
  width: 100vw;
  height: 100vh;
`

const App: React.FC = () => {
  const [currentError, setCurrentError] = useState(
    undefined as string | undefined
  )

  const {
    room,
    votes,
    name,
    readyState,
    createRoom,
    joinRoom,
    leaveRoom,
    setName,
    startNewRound,
    vote
  } = useRoom(setCurrentError)

  return (
    <Viewport>
      <Header
        userName={name}
        room={room}
        onNewRound={startNewRound}
        onLeaveRoom={leaveRoom}
        onSetUserName={setName}
        readyState={readyState}
      />

      {!name && <Welcome onSetName={setName} />}

      {name && !room && (
        <RoomSelection onEnterRoom={joinRoom} onCreateRoom={createRoom} />
      )}

      {name && room && (
        <Stack>
          <Cards
            currentVote={votes[name]}
            onVote={(points) => {
              vote(points)
            }}
          />
          <Round votes={votes} />
        </Stack>
      )}

      <Snackbar
        open={currentError !== undefined}
        autoHideDuration={6000}
        onClose={() => setCurrentError(undefined)}
      >
        <Alert onClose={() => setCurrentError(undefined)} severity='error'>
          {currentError}
        </Alert>
      </Snackbar>
    </Viewport>
  )
}

export default App
