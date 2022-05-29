import { styled, TextField } from '@mui/material'
import React from 'react'

const NameInput = styled(TextField)`
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

const Welcome: React.FC = () => {
  return (
    <div>
      <NameInput
        variant='outlined'
        label='Welcome and enter your name'
        autoFocus
      />
    </div>
  )
}

export default Welcome
