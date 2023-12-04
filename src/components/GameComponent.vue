<script setup lang="ts">
import PhaserContainer from './PhaserContainer.vue'
interface Props {
  scene: any
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <Suspense>
    <PhaserContainer :scene="scene" />

    <template #fallback>
      <div class="placeholder">Downloading ...</div>
    </template>
  </Suspense>
</template>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>
