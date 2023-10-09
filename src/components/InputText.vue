<script>
export default {
  name: 'InputText',
  props: {
    id: String,
    label: String,
    value: String,
    placeholder: String,
    type: String
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<template>
  <!-- <div class="search__wrapper"> -->
  <label :for="id">{{ label }}</label>
  <input
    :name="id"
    :type="type"
    :id="id"
    :value="value"
    @input="updateValue($event.target.value)"
    :placeholder="placeholder"
  />
  <!-- </div> -->
</template>

<style scoped>
input {
  width: 50%;
  height: 3.5rem;
  border: 1px solid transparent;
  outline: none;
  border-radius: 1.6rem;
  padding: 0.5rem 1.5rem;
}

input:focus {
  border: 1px solid gray;
}
</style>
