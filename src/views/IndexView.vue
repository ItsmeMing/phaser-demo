<script setup lang="ts">
import { ref } from 'vue';
import GameComponent from 'src/components/GameComponent.vue'
import SceneMain from '../game/scenes/MainScene'
import SceneMain2 from '../game/scenes/MainScene2'

const scene = ref(SceneMain)

</script>

<template>
  <GameComponent :scene="scene"/>
  <button @click="scene = SceneMain">Scene 1</button>
  <button @click="scene = SceneMain2">Scene 2</button>
</template>

<style lang="scss">
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
