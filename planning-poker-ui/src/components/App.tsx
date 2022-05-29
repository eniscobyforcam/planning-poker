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
    "Click me..." as string | undefined
  )

  const {
    room,
    votes,
    name,
    readyState
  } = useRoom()

  return (
    <Viewport>
      <Header
        userName={name}
        room={room}
        readyState={readyState}
      />

      <Content
        name={name}
        room={room}
        votes={votes}
      />
      
      <Snackbar
        open={currentError !== undefined}
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
