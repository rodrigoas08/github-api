<script lang="ts">
import { useProfileStore } from '../stores/ProfileStore'
import BaseButton from '../components/BaseButton.vue'
import LoadingSpinner from '../components/LoadingSnipper.vue'
import type { RepositoryResponse } from '../interfaces/User'
import IconRepo from '../components/icons/IconRepo.vue'
import IconStar from '../components/icons/IconStar.vue'

const profileStore = useProfileStore()

const initialRepository: RepositoryResponse = {
  description: '',
  html_url: '',
  id: 0,
  language: '',
  name: '',
  stargazers_count: 0
}

export default {
  components: {
    BaseButton,
    LoadingSpinner,
    IconRepo,
    IconStar
  },
  data() {
    const reposUser: any = initialRepository
    return {
      reposUser,
      user: profileStore.getProfile,
      isLoading: false
    }
  },
  methods: {
    async getRepos(): Promise<void> {
      this.isLoading = true
      const reposData = await profileStore.fetchUserRepos(profileStore.getProfile.login)
      profileStore.updateUserRepos(reposData)
      this.reposUser = profileStore.getRepos
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    openLink(url: string) {
      window.open(url, '_blank', 'noopener')
    },
    listRepositoryByStars<T extends RepositoryResponse>(): T[] {
      const list = this.reposUser.sort((a: any, b: any) => {
        return b.stargazers_count - a.stargazers_count
      })
      return list
    }
  },
  created() {
    this.getRepos()
  }
}
</script>

<template>
  <div class="header">
    <router-link :to="{ name: 'home' }">&#8617; Voltar</router-link>
    <h1 v-show="!isLoading">{{ user.name ? user.name : user.login }}</h1>
  </div>

  <LoadingSpinner v-if="isLoading" />
  <div class="cards__wrapper" v-if="reposUser && !isLoading">
    <div class="cards__repo" v-for="repos in listRepositoryByStars()" :key="repos.id">
      <p class="cards__repo-name"><IconRepo /> {{ repos.name }}</p>
      <p class="cards__repo-bio" v-if="repos.description" :title="repos.description">
        {{ repos.description }}
      </p>
      <div style="display: flex; gap: 2rem; font-size: 1.2rem">
        <p class="cards__repo-language" v-if="repos.language">{{ repos.language }}</p>
        <p class="cards__repo-stars"><IconStar /> {{ repos.stargazers_count }}</p>
      </div>
      <BaseButton text="Acessar repositório" @handleFunction="openLink(repos.html_url)" />
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 100%;
  display: grid;
  padding: 0 2rem;
  grid-template-rows: 0.2fr 1fr;
}

.header a {
  text-shadow: 0.1rem 0.4rem 0.3rem #000;
}

.header h1 {
  color: rgb(240, 248, 255);
  align-self: center;
  text-shadow: 0.1rem 0.4rem 0.3rem #000;
}

.cards__wrapper {
  gap: 2rem;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  overflow-y: auto;
  position: relative;
  justify-content: flex-start;
}

.cards__repo {
  gap: 1rem;
  flex-grow: 0;
  width: 25rem;
  display: flex;
  height: 16rem;
  padding: 1rem;
  flex-basis: 25rem;
  border-radius: 1rem;
  flex-direction: column;
  background-color: #0d1631;
  justify-content: space-between;
  box-shadow: 0.1rem 0.2rem 0.8rem #000;
}

.cards__repo-name,
.cards__repo-bio {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 1.3rem;
}

.cards__repo-name {
  color: #027afd;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cards__repo-name svg {
  top: 0.2rem;
  position: relative;
}

.cards__repo-name svg {
  margin-right: 0.4rem;
}

.cards__repo-stars {
  gap: 0.5rem;
  display: flex;
  height: 1.4rem;
  color: #027afd;
  font-weight: bold;
  font-size: 1.4rem;
  align-items: center;
}

a {
  font-size: 1.4rem;
  text-decoration: none;
  color: rgb(240, 248, 255);
}

::-webkit-scrollbar {
  width: 0.6rem;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 0.8rem;
  background-color: #027afd;
}
</style>
