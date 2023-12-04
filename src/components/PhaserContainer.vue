<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import launch from '../game/game'

interface Props {
  scene: any
}

const props = withDefaults(defineProps<Props>(), {})

const gameInstance = ref<Phaser.Game>()
const containerId = 'game-container'

watch(
  () => props.scene,
  () => {
    gameInstance.value?.destroy(true)
    gameInstance.value = launch(containerId, props.scene)
  }
)
onMounted(() => {
  gameInstance.value = launch(containerId, props.scene)
})

onUnmounted(() => {
  gameInstance.value?.destroy(false)
})
</script>

<template>
  <div :id="containerId" />
</template>
