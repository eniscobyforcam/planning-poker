import {Link, styled, TextField, Typography} from '@mui/material'
import React, {KeyboardEventHandler, useCallback} from 'react'

const Window = styled('div')`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

interface Props {
  onEnterRoom: (no: number) => void
  onCreateRoom: () => void
}

const RoomSelection: React.FC<Props> = ({
  onEnterRoom,
  onCreateRoom
}) => {
  const onKeyUp: KeyboardEventHandler = useCallback((e) => {
    if (e.key === 'Enter') {
      onEnterRoom(parseInt((e.target as HTMLInputElement).value))
      e.preventDefault()
    }
  }, [onEnterRoom])

  return (
    <Window>
      <Link variant='h6' onClick={onCreateRoom}>
        Create new room...
      </Link>
      <Typography variant='h6'>or</Typography>
      <TextField
        variant='outlined'
        label='join room'
        autoFocus
        onKeyUp={onKeyUp}
      />
    </Window>
  )
}

export default RoomSelection
