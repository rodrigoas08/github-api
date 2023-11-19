import { defineStore } from 'pinia'

export const useRouteStore = defineStore({
  id: 'route',
  state: () => {
    return {
      route: ''
    }
  },
  actions: {
    updateRouteName(routeName: string) {
      this.route = routeName
    }
  },
  getters: {
    getRouteName(): String {
      return this.route
    }
  }
})
