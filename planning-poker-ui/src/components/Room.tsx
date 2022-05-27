import { Stack } from "@mui/material"
import Cards from "./Cards"
import Round from "./Round"

interface Props {
    name: string
    votes: Record<string, string>
    vote: (points: string) => void
}

const Room : React.FC<Props> = ({name, votes, vote}) => {
    return (
        <Stack>
          <Cards
            currentVote={votes[name]}
            onVote={(points) => {
              vote(points)
            }}
          />
          <Round votes={votes} />
        </Stack>
    )
}

export default Room