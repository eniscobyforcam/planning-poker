import Room from './Room'
import RoomSelection from './RoomSelection'
import Welcome from './Welcome'

interface Props {
    name: string | undefined
    room: number | undefined
    setName: (name: string) => void
    votes: Record<string, string>
    joinRoom: (room: number) => void
    createRoom: () => void
    vote: (points: string) => void
}

const Content: React.FC<Props> = ({name, room, votes, setName, joinRoom, createRoom, vote}) => {
  return (
    <>
      {!name && <Welcome onSetName={setName} />}

      {name && !room && (
        <RoomSelection onEnterRoom={joinRoom} onCreateRoom={createRoom} />
      )}

      {name && room && (
        <Room name={name} votes={votes} vote={vote}/>
      )}
    </>
  )
}

export default Content
