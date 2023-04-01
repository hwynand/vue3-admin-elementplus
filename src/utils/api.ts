import axios from 'axios'
import { baseURL } from '../constants'
import { useCommonStore } from '@/stores/common'

const api = axios.create({
  baseURL,
  paramsSerializer: {
    indexes: null
  }
})

api.interceptors.request.use((config) => {
  const commonStore = useCommonStore()
  commonStore.loading = true
  const accessToken = localStorage.getItem('access-token')
  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
  return config
})

api.interceptors.response.use((respone) => {
  const commonStore = useCommonStore()
  commonStore.loading = false
  return respone
}, (error) => {
  const commonStore = useCommonStore()
  commonStore.loading = false
  return Promise.reject(error)
})

export { api }
