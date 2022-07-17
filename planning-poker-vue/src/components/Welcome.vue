<script setup lang="ts">
import { ref } from 'vue';

defineEmits<{
    (e: 'name', name: string): void
}>()

const name=ref("")

</script>

<template>
    <div id="name" class="centered">
        <el-input placeholder="Your name" class="w-50 m-2" v-model="name" @keyup.enter="$emit('name', name)"/>
    </div>
</template>
