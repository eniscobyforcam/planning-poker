import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

const StyledTable = styled(Table)`
  margin: ${({theme}) => theme.spacing(1)};
`

const Round: React.FC = () => {
  return (
    <Container fixed>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Vote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>?</TableCell>
            </TableRow>
        </TableBody>
      </StyledTable>
    </Container>
  )
}

export default Round
