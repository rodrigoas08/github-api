<script lang="ts">
import ProfileCard from '../components/ProfileCard.vue'
import LoadingSpinner from '../components/LoadingSnipper.vue'
import BaseButton from '../components/BaseButton.vue'
import HTTP_STATUS_CODE from '../enums/HttpStatusCode'
import { useProfileStore } from '../stores/ProfileStore'
// import { setActivePinia, createPinia } from 'pinia'
import type { ProfileResponse } from '../interfaces/User'

// const pinia = createPinia()
// setActivePinia(pinia)
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
    async fetchUserProfile(userName: string): Promise<void> {
      if (this.inputValue === '') {
        this.warningText = 'Por favor, digite um nome de usuário'
        return
      } else {
        this.warningText = ''
        this.isLoading = true
        this.user = {} as ProfileResponse
        const { profileData, response } = await profileStore.fetchUserProfile(userName)
        profileStore.updateProfile(profileData)
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
              this.user = {} as ProfileResponse
              this.hasUser = false
              this.isLoading = false
              break
            case HTTP_STATUS_CODE.NOT_FOUND:
              this.warningText = 'Usuário não encontrado.'
              this.user = {} as ProfileResponse
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
        @keyup.enter="fetchUserProfile(inputValue)"
      />
      <div class="button_wrapper">
        <BaseButton text="Buscar" @handleFunction="fetchUserProfile(inputValue)" />
        <BaseButton text="Limpar" @handleFunction="clearInput" />
      </div>
    </div>
  </div>

  <div class="search__result">
    <h2 v-if="warningText">{{ warningText }}</h2>
    <LoadingSpinner v-if="isLoading" />
    <ProfileCard
      v-if="hasUser && !isLoading"
      :avatar="user.avatar_url"
      :name="user.name"
      :login="user.login"
      :bio="user.bio"
      :location="user.location"
      :followers="user.followers"
      :following="user.following"
      :repositories="user.public_repos"
    />
  </div>
</template>

<style scoped>
.wrapper {
  gap: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h1 {
  color: #027afd;
  font-size: 1.8rem;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0.1rem 0.4rem 0.3rem #000;
}

.search__wrapper {
  gap: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

input {
  width: 100%;
  outline: none;
  height: 3.7rem;
  font-size: 1.6rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.8rem;
  border: 0.2rem solid transparent;
}

input:focus {
  font-size: 1.6rem;
  border: 0.2rem solid #027afd;
}

.button_wrapper {
  gap: 1rem;
  width: 100%;
  display: flex;
}

.search__result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  width: 80%;
  font-size: 1.8rem;
  text-align: center;
}

/*RESPONSIVIDADE*/
@media only screen and (min-width: 768px) {
  .wrapper {
    gap: 2rem;
  }

  h1 {
    font-size: 3.8rem;
  }

  .search__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  input {
    width: 50%;
  }

  .button_wrapper {
    width: 50%;
  }

  h2 {
    width: 100%;
    font-size: 2.4rem;
  }
}
</style>
