import { defineStore } from 'pinia'

import type { IBrand } from '@/interfaces'
import { api } from '@/utils'

export const useBrandsStore = defineStore('brands', {
  state: () => ({
    brandList: [] as IBrand[],
  }),
  actions: {
    async getBrandList() {
      try {
        const { data } = await api.get('/brands/')
        this.brandList = data
      } catch (error) {
        console.error('Brand store E: ', error)
      }
    }
  }
})