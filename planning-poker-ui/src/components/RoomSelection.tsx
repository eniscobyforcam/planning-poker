import { Link, styled, TextField, Typography } from '@mui/material'
import React from 'react'

const Window = styled('div')`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const RoomSelection: React.FC = () => {
  return (
    <Window>
      <Link variant='h6'>
        Create new room...
      </Link>
      <Typography variant='h6'>or</Typography>
      <TextField
        variant='outlined'
        label='join room'
        autoFocus
      />
    </Window>
  )
}

export default RoomSelection
