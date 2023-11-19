<script lang="ts">
import { useProfileStore } from '../stores/ProfileStore'
import BaseButton from '../components/BaseButton.vue'
import LoadingSpinner from '../components/LoadingSnipper.vue'
import type { RepositoryResponse } from '../interfaces/User'
import IconRepo from '../components/icons/IconRepo.vue'
import IconStar from '../components/icons/IconStar.vue'
import { useRouteStore } from '../stores/RouteStore'

const profileStore = useProfileStore()
const routerStore = useRouteStore()

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
    return {
      reposUser: initialRepository,
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
    listRepositoryByStars(): Array<RepositoryResponse> {
      const list: RepositoryResponse = this.reposUser
      const reposArray = Object.values(list)
      const sortedRepos = reposArray.sort((a: any, b: any) => {
        return b.stargazers_count - a.stargazers_count
      })
      return sortedRepos
    }
  },
  created() {
    routerStore.updateRouteName(window.location.pathname)
    this.getRepos()
  }
}
</script>

<template>
  <div class="header">
    <router-link :to="{ name: 'home' }">
      <span style="font-size: 1.5rem">&#129184;</span> Voltar
    </router-link>
    <h1 v-show="!isLoading">{{ user.name ? user.name : user.login }}</h1>
  </div>

  <LoadingSpinner v-if="isLoading" />
  <div class="cards__wrapper" v-if="reposUser && !isLoading">
    <div class="cards__repo" v-for="repos in listRepositoryByStars()" :key="repos.id">
      <p class="card__repo-name"><IconRepo /> {{ repos.name }}</p>
      <p class="card__repo-bio" v-if="repos.description" :title="repos.description">
        {{ repos.description }}
      </p>

      <div class="card_repo-footer">
        <p class="card__repo-language" v-if="repos.language">{{ repos.language }}</p>
        <p class="card__repo-stars"><IconStar /> {{ repos.stargazers_count }}</p>
        <BaseButton text="Acessar repositório" @handleFunction="openLink(repos.html_url)" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
}

.header a,
span {
  text-shadow: 0.1rem 0.4rem 0.3rem #000;
  width: fit-content;
}

.header h1 {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(240, 248, 255);
  text-shadow: 0.1rem 0.4rem 0.3rem #000;
}

.cards__wrapper {
  row-gap: 2rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-top: 1rem;
  position: relative;
  overflow-x: hidden;
  justify-content: center;
}

.cards__repo {
  width: 94%;
  gap: 0.5rem;
  display: flex;
  height: 20rem;
  padding: 1rem;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 0.8rem;
  flex-direction: column;
  background-color: #0d1631;
  justify-content: space-between;
  box-shadow: 0.1rem 0.2rem 0.8rem #000;
}

.card__repo-name,
.card__repo-bio {
  overflow: hidden;
  font-size: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card__repo-name {
  color: #027afd;
  font-size: 1.8rem;
  font-weight: bold;
}

.card__repo-name svg {
  top: 0.2rem;
  position: relative;
  margin-right: 0.4rem;
}

.card_repo-footer {
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.2rem;
  align-items: center;
}

.card__repo-stars {
  gap: 0.5rem;
  display: flex;
  height: 1.4rem;
  color: #027afd;
  font-weight: bold;
  font-size: 1.2rem;
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

@media only screen and (min-width: 768px) {
  .header {
    padding: 0 2rem;
  }

  .cards__wrapper {
    gap: 2.9rem;
    padding-inline: 2rem;
    justify-content: flex-start;
  }

  .cards__repo {
    width: 30rem;
    height: 21rem;
  }

  .card__repo-name,
  .card__repo-bio {
    overflow: hidden;
    white-space: wrap;
    font-size: 1.4rem;
  }

  .card__repo-name {
    font-size: 1.8rem;
  }

  .card_repo-footer {
    font-size: 1.6rem;
  }

  .card__repo-stars {
    font-size: 1.6rem;
  }
}
</style>
