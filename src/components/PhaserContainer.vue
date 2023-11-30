<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import launch from '../game/game'

const gameInstance = ref<Phaser.Game>()
const containerId = 'game-container'

onMounted(() => {
  gameInstance.value = launch(containerId)
})

onUnmounted(() => {
  gameInstance.value?.destroy(false)
})
</script>

<template>
  <div :id="containerId" />
</template>
