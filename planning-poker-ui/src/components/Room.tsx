import {Stack} from '@mui/material'
import Cards from './Cards'
import Round from './Round'

interface Props {
  name: string
  votes: Record<string, string>
}

const Room: React.FC<Props> = ({name, votes}) => {
  return (
    <Stack>
      <Cards currentVote={votes[name]} />
      <Round votes={votes} />
    </Stack>
  )
}

export default Room
