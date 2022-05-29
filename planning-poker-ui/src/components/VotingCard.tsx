import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme
} from '@mui/material'
import {styled} from '@mui/system'

interface Props {
  value: string
}

const StyledCardContent = styled(CardContent)`
  height: 60px;
  width: 45px;
`

const StyledCard = styled(Card)`
  margin: ${({theme}) => theme.spacing(1)};
`

const VotingCard: React.FC<Props> = ({
  value,
}) => {
  const theme = useTheme()
  const background = theme.palette.secondary.contrastText

  return (
    <StyledCard sx={{background}}>
      <CardActionArea>
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
