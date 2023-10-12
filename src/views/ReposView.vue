<script lang="ts">
import { useProfileStore } from '../stores/ProfileStore'

const profileStore = useProfileStore()

export default {
  data() {
    return {
      user: profileStore.getProfile
    }
  }
}
</script>
<template>
  <div>
    <router-link :to="{ name: 'home' }">Back</router-link>
    <h1>{{ this.user.location }}</h1>
  </div>
</template>

<style>
a {
  font-size: 1.4rem;
  text-decoration: none;
  color: rgb(240, 248, 255);
}
</style>
