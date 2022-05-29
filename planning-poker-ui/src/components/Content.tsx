import Room from './Room'
import RoomSelection from './RoomSelection'
import Welcome from './Welcome'

interface Props {
  name: string | undefined
  room: number | undefined
  votes: Record<string, string>
}

const Content: React.FC<Props> = ({name, room, votes}) => {
  return (
    <>
      {!name && <Welcome />}

      {name && !room && <RoomSelection />}

      {name && room && <Room name={name} votes={votes} />}
    </>
  )
}

export default Content
