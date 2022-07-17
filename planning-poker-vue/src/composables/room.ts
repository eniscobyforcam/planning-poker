import { useWebSocket, type WebSocketStatus } from '@vueuse/core'
import { readonly, ref, type Ref } from 'vue'

interface Room {
  room: Ref<number | undefined>
  name: Ref<string | undefined>
  status: Ref<WebSocketStatus>
  votes: Ref<Record<string, string>>
  setName: (name: string) => void
  createRoom: () => void
  joinRoom: (no: number) => void
  leaveRoom: () => void
  startNewRound: () => void
  logout: () => void
  vote: (points: string) => void
}

interface Message {
  result: string
  error?: string
  room: number
  votes: Record<string, string>
}

export function useRoom(url: string, showError: (err: string) => void): Room {
  const name = ref(undefined as string | undefined)
  const room = ref(undefined as number | undefined)
  const votes = ref({} as Record<string, string>)

  const {status, send} = useWebSocket<Message>(url, {
    autoReconnect: true,
    onMessage: (ws: WebSocket, event: MessageEvent) => {
      const msg = JSON.parse(event.data) as Message
      switch (msg.result) {
        case 'Error':
          if (msg.error) showError(msg.error)
          break
        case 'NewRoom':
          room.value = msg.room
          joinRoom(msg.room)
          break
        case 'Votes':
          room.value = msg.room
          votes.value = msg.votes
          break
      }
    }
  })

  const vote = (points: string) => {
    send(
      JSON.stringify({
        action: 'Vote',
        room: room.value,
        name: name.value,
        points
      })
    )
  }

  const setName = (newName: string) => {
    name.value = newName
  }

  const createRoom = () => {
    send(
      JSON.stringify({
        action: 'CreateRoom'
      })
    )
  }

  const joinRoom = (newRoom: number | undefined) => {
    send(
      JSON.stringify({
        action: 'JoinRoom',
        room: newRoom,
        name: name.value
      })
    )
  }

  const leaveRoom = () => {
    send(
      JSON.stringify({
        action: 'LeaveRoom',
        room: room.value,
        name: name.value
      })
    )
    room.value = undefined
  }

  const logout = () => {
    leaveRoom()
    name.value = undefined
  }

  const startNewRound = () => {
    send(
      JSON.stringify({
        action: 'NewRound',
        room: room.value
      })
    )
  }

  return {
    votes: readonly(votes),
    name: readonly(name),
    room: readonly(room),
    status: readonly(status),
    vote,
    setName,
    createRoom,
    joinRoom,
    leaveRoom,
    startNewRound,
    logout
  }
}
