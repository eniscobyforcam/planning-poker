import {Grid} from '@mui/material'
import {styled} from '@mui/system'
import React from 'react'
import VotingCard from './VotingCard'

const Background = styled(Grid)`
  width: calc(100% - 2 * ${({theme}) => theme.spacing(1)});
  margin: ${({theme}) => theme.spacing(1)};
`

interface Props {
  currentVote: string
}

const Cards: React.FC<Props> = ({currentVote}) => {
  return (
    <Background container spacing={1} justifyContent='center'>
      {["0", "0.5", "1", "2", "3", "5", "8", "13", "20", "40", "100", "?", "☕"].map((value) => (
        <VotingCard
          key={`Card_${value}`}
          value={value}
          currentVote={currentVote}
        />
      ))}
    </Background>
  )
}

export default Cards
