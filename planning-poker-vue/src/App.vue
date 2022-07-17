<script setup lang="ts">
import Header from './components/Header.vue'
import Content from './components/Content.vue'
import { useRoom } from './composables/room';

const { name, room, votes, vote, setName, createRoom, joinRoom, leaveRoom, logout, startNewRound } = useRoom()
</script>

<template>
  <div id="app">
    <Header
      :room="room"
      :name="name"
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
