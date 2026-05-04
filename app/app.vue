<template>
  <div class="app-wrapper">
    <TrafficLight />
  </div>
</template>

<script setup lang="ts">
import { useTrafficLight } from '~/composables/useTrafficLight'
import { onMounted, onUnmounted } from 'vue'

const { start, stop } = useTrafficLight()

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<style>
body {
  background-color: black;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.app-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}
</style>
