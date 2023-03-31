import { defineStore } from "pinia"

import { api } from "@/utils"
import type { IUser, ILogInData, ILogInResponse } from "@/interfaces"
import { API_ENDPOINTS } from "@/constants"

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
        const { data, status }: { data: ILogInResponse, status: number } = await api.post(API_ENDPOINTS.auth.login, params)
        localStorage.setItem('access-token', data.access_token)
        this.getProfileMe()
        return status
      } catch (error) {
        console.log('Login E:', error)
      }
    },
    async getProfileMe() {
      try {
        const { data, status }: { data: IUser, status: number} = await api.get(API_ENDPOINTS.user.profileMe)
        this.user = data
        localStorage.setItem('user', JSON.stringify(data))
        return status
      } catch (error) {
        console.error('Get profile E:', error)
      }
    }
  }
})