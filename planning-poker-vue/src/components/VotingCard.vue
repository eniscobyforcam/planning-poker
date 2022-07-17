<script setup lang="ts">import type { VNodeNormalizedChildren } from 'vue'

const props = defineProps<{
    value: string,
    current: string
}>()

const emit = defineEmits<{
    (e: 'vote', vote: string): void
}>()

const handleClick = () => {
    if (props.value === props.current) 
        emit('vote', "")
    else
        emit('vote', props.value)
}
</script>

<template>
    <div id="paper" :class="{active: current === value}" @click="handleClick">{{ value }}</div>
</template>

<style scoped>
#paper {
    box-shadow: 2px 2px rgb(163, 160, 160);
    width: 2em;
    height: 3em;
    font-size: 2em;
    text-align: center;
    border-radius: 5px;
    display: inline-block;
    margin: 10px;
    user-select: none;
}

.active {
    background-color: blueviolet;
}
</style>