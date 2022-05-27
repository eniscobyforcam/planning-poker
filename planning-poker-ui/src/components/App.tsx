import { Alert, Snackbar } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { useRoom } from '../hooks/useRoom'
import Content from './Content'
import Header from './Header'

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
        readyState={readyState}
        onNewRound={startNewRound}
        onLeaveRoom={leaveRoom}
        onSetUserName={setName}
      />

      <Content
        name={name}
        room={room}
        votes={votes}
        setName={setName}
        joinRoom={joinRoom}
        createRoom={createRoom}
        vote={vote}
      />
      
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
