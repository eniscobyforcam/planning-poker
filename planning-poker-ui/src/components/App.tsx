import { Alert, Snackbar } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import Content from './Content'
import Header from './Header'

const Viewport = styled('div')`
  width: 100vw;
  height: 100vh;
`

const App: React.FC = () => {
  return (
    <Viewport>
      <Header/>

      <Content/>
      
      <Snackbar
        open={true}
      >
        <Alert severity='error'>
          Here comes the error...
        </Alert>
      </Snackbar>
    </Viewport>
  )
}

export default App
