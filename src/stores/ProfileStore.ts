import type { GitHubUserResponse, RepositoryResponse } from '@/interfaces/User'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => {
    return {
      profile: {} as GitHubUserResponse,
      repos: {} as RepositoryResponse
    }
  },
  actions: {
    updateProfile(profileData: GitHubUserResponse) {
      this.profile = profileData
    },
    async fetchUserProfile(string: string) {
      const response = await fetch(`https://api.github.com/users/${string}`)
      const profileData = response.json()
      return profileData
    },
    updateUserRepos(reposData: RepositoryResponse) {
      this.repos = reposData
    },
    async fetchUserRepos(string: string) {
      const response = await fetch(`https://api.github.com/users/${string}/repos`)
      const reposData = response.json()
      return reposData
    }
  },
  getters: {
    getProfile(): GitHubUserResponse {
      return this.profile
    },
    getRepos(): RepositoryResponse {
      return this.repos
    }
  }
})
