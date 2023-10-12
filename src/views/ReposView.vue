<script lang="ts">
import { useProfileStore } from '../stores/ProfileStore'
import BaseButton from '../components/BaseButton.vue'
import LoadingSpinner from '../components/LoadingSnipper.vue'
import type { RepositoryResponse } from '../interfaces/User'

const profileStore = useProfileStore()

const InitialRepos: RepositoryResponse = {
  description: '',
  html_url: '',
  id: null,
  language: '',
  name: '',
  stargazers_count: null
}

export default {
  components: {
    BaseButton,
    LoadingSpinner
  },
  data() {
    return {
      reposUser: InitialRepos,
      user: profileStore.getProfile,
      isLoading: false
    }
  },
  methods: {
    async getRepos(): Promise<void> {
      this.isLoading = true
      console.log('login', profileStore.getProfile.login)
      const reposData = await profileStore.fetchUserRepos(profileStore.getProfile.login)
      profileStore.updateUserRepos(reposData)
      this.reposUser = profileStore.getRepos
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    openLink(url: string) {
      window.open(url, '_blank', 'noopener')
    }
  },
  created() {
    console.log(profileStore.getProfile)
    this.getRepos()
  }
}
</script>

<template>
  <div class="header">
    <router-link :to="{ name: 'home' }">&#8617; Voltar</router-link>
    <h1 v-show="!this.isLoading">{{ this.user.name ? this.user.name : this.user.login }}</h1>
  </div>

  <LoadingSpinner v-if="this.isLoading" />
  <div class="cards__wrapper" v-if="this.reposUser && !this.isLoading">
    <div class="cards__repo" v-for="repos in this.reposUser" :key="repos.id">
      <p class="cards__repo-name">{{ repos.name }}</p>
      <p class="cards__repo-bio" v-if="repos.description" :title="repos.description">
        {{ repos.description }}
      </p>
      <div style="display: flex; gap: 1rem; font-size: 1.2rem">
        <p class="cards__repo-language" v-if="repos.language">{{ repos.language }}</p>
        <p class="cards__repo-stars">{{ repos.stargazers_count }} stars</p>
      </div>
      <BaseButton text="Acessar repositório" @handleFunction="openLink(repos.html_url)" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: grid;
  grid-template-rows: 0.2fr 1fr;
  height: 100%;
}
.cards__wrapper {
  display: flex;
  padding: 2rem;
  gap: 1rem;
  margin: 0 auto;
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.cards__repo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24.625rem;
  height: 16rem;
  flex-shrink: 0;
  border-radius: 1rem;
  background: #0d1631;
  padding: 1rem;
  gap: 1rem;
}

.cards__repo-name,
.cards__repo-bio {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 1.3rem;
}

.cards__repo-name {
  font-weight: bold;
  color: white;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cards__repo-stars {
  color: rgb(253, 253, 167);
}

a {
  /* position: relative;
  top: -3rem; */
  font-size: 1.4rem;
  text-decoration: none;
  color: rgb(240, 248, 255);
}
</style>
