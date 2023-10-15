<script lang="ts">
import { setActivePinia, createPinia } from 'pinia'
const pinia = createPinia()
setActivePinia(pinia)

export default {
  name: 'App'
}
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
