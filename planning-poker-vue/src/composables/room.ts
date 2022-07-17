import { ref, type Ref } from 'vue'

interface Room {
    room: Ref<number | undefined>
    name: Ref<string | undefined>
    // readyState: string
    votes: Ref<Record<string, string>>
    setName: (name: string) => void
    createRoom: () => void
    joinRoom: (no: number) => void
    leaveRoom: () => void
    startNewRound: () => void
    logout: () => void
    vote: (points: string) => void
  }

export function useRoom() : Room {
    const name = ref("Ladi" as string | undefined)
    const room = ref(1 as number | undefined)
    const votes = ref({
        "Ladi": "8",
        "Hans-Karl": "1"
    } as Record<string, string>)

    const vote = (points : string) => {
        votes.value = {
            ...votes.value,
            [name.value!]: points
        }
    }

    const setName = (newName: string) => {
        name.value = newName
    }

    const createRoom = () => {
        room.value = 1
    }

    const joinRoom = (newRoom: number | undefined) => {
        room.value = newRoom
    }

    const logout = () => {
        name.value = undefined
        room.value = undefined
    }

    const leaveRoom = () => {
        room.value = undefined
    }

    const startNewRound = () => {
        const newVotes={} as Record<string, string>
        Object.entries(votes.value).forEach(([key]) => newVotes[key] = "")
        votes.value = newVotes
    }

    return {
        votes,
        name,
        room, 
        vote,
        setName,
        createRoom,
        joinRoom,
        leaveRoom,
        startNewRound,
        logout
    }
}