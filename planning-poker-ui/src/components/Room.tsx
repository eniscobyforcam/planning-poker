import { Stack } from "@mui/material"
import Cards from "./Cards"
import Round from "./Round"

const Room : React.FC = () => {
    return (
        <Stack>
          <Cards/>
          <Round/>
        </Stack>
    )
}

export default Room