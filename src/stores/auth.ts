import { defineStore } from "pinia"

import { api } from "@/utils"
import type { IUser, ILogInData, ILogInResponse } from "@/interfaces"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null,
    isLoggedIn: false,
  }),
  getters: {

  },
  actions: {
    checkLoggedIn() {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        this.isLoggedIn = true
        const userData = JSON.parse(localStorage.getItem('user')!)
        this.user = userData
      }
    },
    async login(loginData: ILogInData) {
      try {
        const params = new URLSearchParams()
        params.append('username', loginData.username)
        params.append('password', loginData.password)
        const { data, status }: {data: ILogInResponse, status: number} = await api.post('/login/access-token', params)
        localStorage.setItem('access-token', data.access_token)
        return status
      } catch (error) {
        console.log('Login E:', error)
      }
    }
  }
})