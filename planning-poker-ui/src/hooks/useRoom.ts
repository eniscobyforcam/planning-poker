import {useCallback, useEffect, useState} from 'react'
import useWebSocket, {ReadyState} from 'react-use-websocket'

const getEndpointUrl = () => {
  if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_ENDPOINT_URL) {
    return process.env.REACT_APP_ENDPOINT_URL
  }

  const protocol = window.location.protocol === 'https' ? 'wss' : 'ws'

  return `${protocol}://${window.location.host}/endpoint/`
}

const useRoom = (showError: (error: string) => void): {
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
} => {
  const [name, setName] = useState(undefined as string | undefined)
  const [room, setRoom] = useState(undefined as number | undefined)
  const [votes, setVotes] = useState({} as Record<string, string>)

  const {sendMessage, lastMessage, readyState} = useWebSocket(getEndpointUrl(),{
    shouldReconnect: () => true
  })

  const createRoom = useCallback((): void => {
    sendMessage(JSON.stringify({
      action: "CreateRoom"
    }))
  }, [sendMessage])

  const joinRoom = useCallback((no: number): void => {
    sendMessage(JSON.stringify({
      action: "JoinRoom",
      room: no,
      name
    }))
  }, [sendMessage, name])

  const vote = useCallback((points: string): void => {
    sendMessage(JSON.stringify({
      action: "Vote",
      room,
      name,
      points
    }))  
  }, [sendMessage, room, name])

  const leaveRoom = useCallback((): void => {
    sendMessage(JSON.stringify({
      action: "LeaveRoom",
      room,
      name
    }))  
    setRoom(undefined)
  }, [sendMessage, setRoom, room, name])

  const startNewRound = useCallback((): void => {
    sendMessage(JSON.stringify({
      action: "NewRound",
      room
    }))  
  }, [sendMessage, room])

  useEffect(() => {
    if (lastMessage !== null) {
      const msg = JSON.parse(lastMessage.data) as Record<string, any>

      switch (msg.result) {
        case "Error":
          showError(msg.error)
          break
        case "NewRoom":
          setRoom(msg.room)
          joinRoom(msg.room)
          break
        case "Votes":
          setRoom(msg.room)
          setVotes(msg.votes)
          break
      }
    }
  }, [lastMessage, showError, setRoom, joinRoom, setVotes])

  return {
    votes,
    room,
    name,
    readyState,
    setName,
    createRoom,
    joinRoom,
    leaveRoom,
    startNewRound,
    vote
  }
}

export {useRoom}
