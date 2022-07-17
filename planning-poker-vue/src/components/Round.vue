<script setup lang="ts">
import { computed } from 'vue';

interface Row {
    name: string
    vote: string
}

const props = defineProps({
    votes: Object
})

const tableData = computed<Row[]>(() => {
    const result = [] as Row[]
    const options = { uncovered: true }

    if (props.votes) {
        Object.entries(props.votes).forEach(([n, vote]) => {
            result.push({ name: n, vote })
            if (vote === "") 
                options.uncovered = false
        })
    }

    return options.uncovered ? result : result.map(row => ({name: row.name, vote: "?"} as Row))
})
</script>

<template>
    <el-table id="room" :data="tableData" stripe>
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="vote" label="Vote" width="180" />
    </el-table>
</template>

<style scoped>
#room {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
</style>