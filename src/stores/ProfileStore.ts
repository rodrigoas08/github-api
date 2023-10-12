import type { GitHubUserResponse } from '@/interfaces/User'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => {
    return {
      profile: {} as GitHubUserResponse
    }
  },
  actions: {
    updateProfile(profileData: GitHubUserResponse) {
      this.profile = { ...this.profile, ...profileData }
    }
  },
  getters: {
    getProfile(): GitHubUserResponse {
      return this.profile
    }
  }
})
