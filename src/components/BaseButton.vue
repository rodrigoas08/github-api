<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    text: String
  },
  emits: ['handleFunction']
}
</script>

<template>
  <button @click="$emit('handleFunction')">{{ text }}</button>
</template>

<style scoped>
button {
  height: 3.5rem;
  color: white;
  cursor: pointer;
  background-color: transparent;

  background-color: #027afd;
  padding: 0.5rem 1.5rem;
  border: 1px solid #2c3e50;
  border-radius: 1.6rem;
}

button:hover {
  background-color: #2c3e50;
}
</style>
