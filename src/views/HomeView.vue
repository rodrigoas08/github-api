<script lang="ts">
import ProfileCard from '../components/ProfileCard.vue'

export default {
  components: { ProfileCard }
}
</script>

<template>
  <main>
    <div>
      <TheWelcome />
    </div>
    <div class="search__result">
      <ProfileCard
        v-if="this.hasUser"
        :name="this.user.name"
        :followers="this.user.followers"
        :following="this.user.following"
        :location="this.user.location"
        :repository="this.user.repos_url"
        :site="this.user.blog"
      />
    </div>
  </main>
</template>
