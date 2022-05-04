import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import {styled} from '@mui/system'
import React, {useMemo} from 'react'

const StyledTable = styled(Table)`
  margin: ${(props) => props.theme.spacing(1)};
`

interface RoundProps {
  votes: Record<string, string>
}

const Round: React.FC<RoundProps> = ({votes}) => {
  const revealed = useMemo(
    () =>
      Object.values(votes).reduce(
        (total, current) => total && current !== '',
        true
      ),
    [votes]
  )

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
          {Object.entries(votes).map(([person, points]) => (
            <TableRow key={person}>
              <TableCell>{person}</TableCell>
              <TableCell>
                {revealed ? points : votes[person] === '' ? '?' : '✔️'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Container>
  )
}

export default Round
