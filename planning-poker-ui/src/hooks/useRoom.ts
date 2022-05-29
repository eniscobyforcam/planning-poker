import { useState } from 'react'
import { ReadyState } from 'react-use-websocket'

interface Room {
  room: number | undefined
  name: string | undefined
  readyState: ReadyState
  votes: Record<string, string>
}

const useRoom = (): Room => {
  const [name, setName] = useState("user 1" as string | undefined)
  const [room, setRoom] = useState(1 as number | undefined)
  const [votes, setVotes] = useState({
    "user 1": "5",
    "user 2": "3"
  } as Record<string, string>)

  return {
    votes,
    room,
    name,
    readyState: ReadyState.OPEN,
  }
}

export { useRoom }

