<script lang="ts">
import ProfileCard from '../components/ProfileCard.vue'
import LoadingSpinner from '../components/LoadingSnipper.vue'
import BaseButton from '../components/BaseButton.vue'
import HTTP_STATUS_CODE from '../enums/HttpStatusCode'
import { useProfileStore } from '../stores/ProfileStore'
import { setActivePinia, createPinia } from 'pinia'

const pinia = createPinia()
setActivePinia(pinia)
const profileStore = useProfileStore()

export default {
  components: {
    ProfileCard,
    LoadingSpinner,
    BaseButton
  },
  data() {
    return {
      user: profileStore.getProfile,
      inputValue: '',
      hasUser: false,
      isLoading: false,
      warningText: ''
    }
  },
  methods: {
    async getUserProfile(userName: string): Promise<void> {
      if (this.inputValue === '') {
        this.warningText = 'Por favor, digite um nome de usuário'
        return
      } else {
        this.warningText = ''
        this.isLoading = true
        const response = await fetch(`https://api.github.com/users/${userName}`)
        const data = await response.json()
        profileStore.updateProfile(data)
        setTimeout(() => {
          switch (response.status) {
            case HTTP_STATUS_CODE.OK:
              this.user = profileStore.getProfile
              this.warningText = ''
              this.hasUser = true
              this.isLoading = false
              break
            case HTTP_STATUS_CODE.UNAUTHORIZED:
            case HTTP_STATUS_CODE.FORBIDDEN:
              this.warningText = 'Busca não autorizada, tente novamente mais tarde.'
              this.user = {}
              this.hasUser = false
              this.isLoading = false
              break
            case HTTP_STATUS_CODE.NOT_FOUND:
              this.warningText = 'Usuário não encontrado.'
              this.user = {}
              this.hasUser = false
              this.isLoading = false
              break
            default:
              this.warningText = 'Algo de errado na busca aconteceu, tente novamente mais tarde.'
              this.hasUser = false
              this.isLoading = false
          }
        }, 3000)
      }
    },
    clearInput() {
      this.inputValue = ''
      this.hasUser = false
      this.warningText = ''
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <h1>Buscador de perfis no GitHub</h1>
    <div class="search__wrapper">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Digite um nome de usuário"
        v-model="inputValue"
        @keyup.enter="getUserProfile(inputValue)"
      />
      <div class="button_wrapper">
        <BaseButton text="Buscar" @handleFunction="getUserProfile(inputValue)" />
        <BaseButton text="Limpar" @handleFunction="clearInput" />
      </div>
    </div>
  </div>

  <div class="search__result">
    <h2>{{ warningText }}</h2>
    <LoadingSpinner v-if="this.isLoading" />
    <ProfileCard
      v-if="this.hasUser && !this.isLoading"
      :avatar="this.user.avatar_url"
      :name="this.user.name"
      :login="this.user.login"
      :bio="this.user.bio"
      :location="this.user.location"
      :followers="this.user.followers"
      :following="this.user.following"
      :repositorios="this.user.public_repos"
      :repository="this.user.repos_url"
    />
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 2.8rem;
  text-transform: uppercase;
}

.search__wrapper {
  gap: 1rem;
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: center;
}

.search__result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  width: 50%;
  height: 3.5rem;
  border: 1px solid transparent;
  outline: none;
  padding: 0.5rem 1.5rem;
  border-radius: 1.6rem;
}

input:focus {
  border: 1px solid #21262d;
}

.button_wrapper {
  display: flex;
  gap: 1rem;
}
</style>
