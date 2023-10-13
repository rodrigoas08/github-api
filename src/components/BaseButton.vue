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
  width: 100%;
  height: 3.5rem;
  color: white;
  cursor: pointer;
  border-radius: 0.8rem;
  padding: 0.5rem 1.5rem;
  background-color: #027afd;
  border: 1px solid #2c3e50;
  box-shadow: 0.1rem 0.4rem 0.8rem rgba(0, 0, 0, 0.412);
}

button:hover {
  background-color: #2c3e50;
}
</style>
