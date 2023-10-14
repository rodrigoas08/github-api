import type { ProfileResponse, RepositoryResponse } from '@/interfaces/User'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => {
    return {
      profile: {} as ProfileResponse,
      repos: {} as RepositoryResponse
    }
  },
  actions: {
    updateProfile(profileData: ProfileResponse) {
      this.profile = profileData
    },
    async fetchUserProfile(string: string) {
      const response = await fetch(`https://api.github.com/users/${string}`)
      const profileData = await response.json()
      return { profileData, response }
    },
    updateUserRepos(reposData: RepositoryResponse) {
      this.repos = reposData
    },
    async fetchUserRepos(string: string) {
      const response = await fetch(`https://api.github.com/users/${string}/repos`)
      const reposData = await response.json()
      return reposData
    }
  },
  getters: {
    getProfile(): ProfileResponse {
      return this.profile
    },
    getRepos(): RepositoryResponse {
      return this.repos
    }
  }
})
