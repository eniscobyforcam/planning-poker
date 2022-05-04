import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme
} from '@mui/material'
import {styled} from '@mui/system'

interface VotingCardProps {
  value: string
  currentVote: string
  onVote: (vote: string) => void
}

const StyledCardContent = styled(CardContent)`
  height: 60px;
  width: 45px;
`

const StyledCard = styled(Card)`
  margin: ${({theme}) => theme.spacing(1)};
`

const VotingCard: React.FC<VotingCardProps> = ({
  value,
  currentVote,
  onVote
}) => {
  const theme = useTheme()
  const background =
    value === currentVote
      ? theme.palette.secondary.main
      : theme.palette.secondary.contrastText

  const onClick = () => {
    if (value === currentVote) onVote('')
    else onVote(value)
  }

  return (
    <StyledCard sx={{background}}>
      <CardActionArea onClick={onClick}>
        <StyledCardContent>
          <Typography
            variant='h5'
            color={theme.palette.getContrastText(background)}
          >
            {value}
          </Typography>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  )
}

export default VotingCard
