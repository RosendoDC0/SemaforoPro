<template>
  <div class="traffic-light-container">
    <TrafficLightBulb 
      v-for="light in lights" 
      :key="light.color"
      :color="light.color"
      :active="activeLight === light.color"
    />
  </div>
</template>

<script setup lang="ts">
import { useTrafficLight } from '~/composables/useTrafficLight'

const { lights, activeLight } = useTrafficLight()
</script>

<style scoped>
.traffic-light-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vmin;
}
</style>
