import { styled, TextField } from '@mui/material'
import React, { KeyboardEventHandler, useCallback } from 'react'

interface Props {
  onSetName: (name: string) => void
}

const NameInput = styled(TextField)`
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const Welcome: React.FC<Props> = ({onSetName}) => {
  const onKeyUp: KeyboardEventHandler = useCallback((e) => {
    if (e.key === 'Enter') {
      onSetName((e.target as HTMLInputElement).value)
      e.preventDefault()
    }
  }, [onSetName])

  return (
    <div>
      <NameInput
        variant='outlined'
        label='Welcome and enter your name'
        onKeyUp={onKeyUp}
        autoFocus
      />
    </div>
  )
}

export default Welcome
