<script setup lang="ts">
import Round from './Round.vue'
import Cards from './Cards.vue'

defineProps<{
    name: string,
    room: number,
    votes: Record<string, string>
}>()

defineEmits<{
    (e: 'vote', vote: string): void
}>()

</script>

<template>
    <Cards @vote="vote => $emit('vote', vote)" :votes="votes" :name="name" />
    <Round :votes="votes" />
</template>