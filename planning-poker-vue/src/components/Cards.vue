<script setup lang="ts">
import { computed } from 'vue';
import VotingCard from './VotingCard.vue';

const values = ["0", "0.5", "1", "2", "3", "5", "8", "13", "20", "40", "?", "☕"]

const props = defineProps<{
    name: string
    votes: Record<string, string>
}>()

const current = computed(() => props.votes[props.name])

defineEmits<{
    (e: 'vote', vote: string): void
}>()

</script>

<template>
    <div id="cards">
        <voting-card v-for="value of values" :value="value" :current="current" @vote="vote =>$emit('vote', vote)"/>
    </div>
</template>

<style scoped>
#cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
}
</style>