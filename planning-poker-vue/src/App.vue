<script setup lang="ts">
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import { useRoom } from './composables/room';

let endpointUrl = import.meta.env.VITE_ENDPOINT_URL

if (!endpointUrl) {
  const protocol = window.location.protocol === 'https' ? 'wss' : 'ws'
  endpointUrl = `${protocol}://${window.location.host}/endpoint/`
}

const showError = (err: string) => {
  console.log(`Error: ${err}`)
}

const { name, room, votes, vote, setName, createRoom, joinRoom, leaveRoom, logout, startNewRound, status } = useRoom(endpointUrl, showError)
</script>

<template>
  <div id="app">
    <Header
      :room="room"
      :name="name"
      :status="status"
      @leave-room="leaveRoom"
      @logout="logout"
      @new-round="startNewRound"
    />
    <Content
      :name="name"
      :room="room"
      :votes="votes"
      @vote="vote"
      @name="setName"
      @create-room="createRoom"
      @join-room="(newRoom) => joinRoom(newRoom)"
    />
  </div>
</template>

<style>
@import "./assets/base.css";
</style>

<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
}
</style>
