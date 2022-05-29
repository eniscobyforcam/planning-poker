import {Cable, ExitToApp, Person, Refresh} from '@mui/icons-material'
import {AppBar, IconButton, styled, Toolbar, Typography} from '@mui/material'
import React, {Fragment} from 'react'
import {ReadyState} from 'react-use-websocket'

const Title = styled(Typography)`
  display: block;
  ${({theme}) => theme.breakpoints.down('sm')} {
    display: none;
  }
`

const Room = styled(Typography)`
  flex-grow: 1;
  ${({theme}) => theme.breakpoints.up('sm')} {
    text-align: center;
  }
`

interface Props {
  room?: number
  userName?: string
  onNewRound: () => void
  onLeaveRoom: () => void
  onSetUserName: (name: string | undefined) => void
  readyState: ReadyState
}

const Header: React.FC<Props> = ({
  room,
  userName,
  onNewRound,
  onLeaveRoom,
  onSetUserName,
  readyState
}) => {
  const StatusIndicator: React.FC = () => {
    switch (readyState) {
      case ReadyState.OPEN:
        return <Cable color='success' />
      case ReadyState.CONNECTING:
        return <Cable color='inherit' />
      default:
        return <Cable color='error' />
    }
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <StatusIndicator />

        <Title variant='h6' noWrap>
          Planning Poker
        </Title>

        {room && (
          <Fragment>
            <Room variant='h6' noWrap>
              Room: {room} ({userName})
            </Room>
          </Fragment>
        )}

        {room ? (
          <Fragment>
            <IconButton size='large' color='inherit' onClick={onNewRound}>
              <Refresh />
            </IconButton>
            <IconButton size='large' color='inherit' onClick={onLeaveRoom}>
              <ExitToApp />
            </IconButton>
            <IconButton
              size='large'
              color='inherit'
              onClick={() => {
                onSetUserName(undefined)
                onLeaveRoom()
              }}
            >
              <Person />
            </IconButton>
          </Fragment>
        ) : undefined}
      </Toolbar>
    </AppBar>
  )
}

export default Header
