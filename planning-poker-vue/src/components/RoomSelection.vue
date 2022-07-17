<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
    (e: 'joinRoom', room: number): void
    (e: 'createRoom'): void
}>()

const room = ref(undefined as number | undefined)

const handleRoomInput = () => {
    if (room.value) {
        emit('joinRoom', room.value)
    }
}
</script>

<template>
    <div id="selection" class="centered">
        <el-link id="create-new" @click="$emit('createRoom')">Create new room...</el-link>
        <span>
            or enter room number:
            <el-input-number v-model="room" @keyup.enter="handleRoomInput" autofocus :controls="false" />
        </span>
    </div>
</template>

<style>
#selection {
    display: flex;
    flex-direction: column;
}

#create-new {
    margin-bottom: 10px;
}
</style>