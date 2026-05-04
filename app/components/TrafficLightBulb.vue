<template>
  <div class="bulb" :class="[color, { active }]"></div>
</template>

<script setup lang="ts">
defineProps<{
  color: 'red' | 'yellow' | 'green'
  active: boolean
}>()
</script>

<style scoped>
.bulb {
  width: 25vmin;
  height: 25vmin;
  max-width: 250px;
  max-height: 250px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  background-color: #111;
  transition: background-color 0.1s ease;
}

.bulb.red.active {
  background-color: #ff3b3b;
}

.bulb.yellow.active {
  background-color: #ffcc00;
}

.bulb.green.active {
  background-color: #39d353;
}
</style>
