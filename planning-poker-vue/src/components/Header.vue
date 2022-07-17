<script setup lang="ts">
import { RefreshRight, Connection, House, User } from '@element-plus/icons-vue'
import type { WebSocketStatus } from '@vueuse/core'

defineProps<{
    room?: number,
    name?: string,
    status: WebSocketStatus
}>()

defineEmits<{
    (e: 'logout'): void
    (e: 'leaveRoom'): void
    (e: 'newRound'): void
}>()
</script>

<template>
    <div id="header">
        <Connection class="icon" :class="{
            good: status === 'OPEN',
            bad: status === 'CLOSED',
        }"/>
        <span class="responsive-small-display-none">Planning poker</span>
        <span id="room" class="responsive-small-text-align-left">Room: {{ room }} ({{ name }})</span>
        <RefreshRight class="icon button" @click="$emit('newRound')"/>
        <House class="icon button" @click="$emit('leaveRoom')"/>
        <User class="icon button" @click="$emit('logout')"/>
    </div>
</template>

<style scoped>
#header {
    background-color: rgb(43, 129, 199);
    color: var(--vt-c-white);
    padding: var(--spacing-small);
    display: flex;
    align-items: baseline;
}

#room {
    flex-grow: 1;
    text-align: center;
}

.icon {
    height: 1em;
    width: 1em;
    margin-left: var(--spacing-small);
    margin-right: var(--spacing-small);
}

.button:hover {
    color: var(--hover-color);
}

.good {
    color: rgb(12, 177, 39);
}

.bad {
    color: rgb(177, 12, 40);
}
</style>