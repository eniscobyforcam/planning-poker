import { AppBar, Typography } from '@mui/material'
import React from 'react'

const Header: React.FC = () => {
  return (
    <AppBar position='static'>
        <Typography variant='h6' noWrap>
          Header
        </Typography>
    </AppBar>
  )
}

export default Header
