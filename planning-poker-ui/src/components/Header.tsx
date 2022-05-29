import { Cable, ExitToApp, Person, Refresh } from '@mui/icons-material'
import { AppBar, IconButton, styled, Toolbar, Typography } from '@mui/material'
import React, { Fragment } from 'react'

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

const Header: React.FC = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Cable color='inherit' />

        <Title variant='h6' noWrap>
          Planning Poker
        </Title>

        <Fragment>
          <Room variant='h6' noWrap>
            Room: 1 (user)
          </Room>
        </Fragment>

        <Fragment>
          <IconButton size='large' color='inherit'>
            <Refresh />
          </IconButton>
          <IconButton size='large' color='inherit'>
            <ExitToApp />
          </IconButton>
          <IconButton size='large' color='inherit'>
            <Person />
          </IconButton>
        </Fragment>
      </Toolbar>
    </AppBar>
  )
}

export default Header
