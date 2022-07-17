<script setup lang="ts">
import Welcome from './Welcome.vue'
import RoomSelection from './RoomSelection.vue'
import Room from './Room.vue'

defineProps<{
    name?: string,
    room?: number,
    votes: Record<string, string>
}>()

defineEmits<{
    (e: 'vote', vote: string): void
    (e: 'name', name: string): void
    (e: 'joinRoom', room: number): void
    (e: 'createRoom'): void
}>()
</script>

<template>
    <div id="content">
        <Welcome v-if="!name" @name="name => $emit('name', name)" />
        <RoomSelection
            v-if="name && !room"
            @join-room="newRoom => $emit('joinRoom', newRoom)"
            @create-room="$emit('createRoom')"
        />
        <Room
            v-if="name && room"
            :name="name!"
            :votes="votes"
            :room="room!"
            @vote="vote => $emit('vote', vote)"
        />
    </div>
</template>

<style scoped>
#content {
    height: calc(100vh - 100px);
}
</style>