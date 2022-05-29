import { useCallback, useState } from 'react'
import { ReadyState } from 'react-use-websocket'

interface Room {
  room: number | undefined
  name: string | undefined
  readyState: ReadyState
  votes: Record<string, string>
  setName: (name: string | undefined) => void
  createRoom: () => void
  joinRoom: (no: number) => void
  leaveRoom: () => void
  startNewRound: () => void
  vote: (points: string) => void
}

const useRoom = (showError: (error: string) => void): Room => {
  const [name, setName] = useState(undefined as string | undefined)
  const [room, setRoom] = useState(undefined as number | undefined)
  const [votes, setVotes] = useState({} as Record<string, string>)

  const createRoom = useCallback((): void => {
    setRoom(1)
    setVotes({
      'user 1': '1',
      'user 2': '2',
      [name!]: ''
    })
  }, [name])

  const joinRoom = useCallback(
    (no: number): void => {
      if (no !== 1) {
        showError(`Room ${no} does not exist!`)
      } else {
        setRoom(no)
        setVotes({
          ...votes,
          [name!]: ''
        })
      }
    },
    [name, votes, showError]
  )

  const vote = useCallback(
    (points: string): void => {
      setVotes({
        ...votes,
        [name!]: points
      })
    },
    [name, votes]
  )

  const leaveRoom = useCallback((): void => {
    setRoom(undefined)

    const newVotes = {} as Record<string, string>
    Object.entries(votes).forEach(([key, value]) => {
      if (key !== name) newVotes[key] = value
    })
    setVotes(newVotes)
  }, [setRoom, name, votes])

  const startNewRound = useCallback((): void => {
    const newVotes = {} as Record<string, string>
    Object.keys(votes).forEach((key) => {
      newVotes[key] = ''
    })
    setVotes(newVotes)
  }, [votes])

  return {
    votes,
    room,
    name,
    readyState: ReadyState.OPEN,
    setName,
    createRoom,
    joinRoom,
    leaveRoom,
    startNewRound,
    vote
  }
}

export { useRoom }

