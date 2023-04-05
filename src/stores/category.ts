import { defineStore } from 'pinia'

import type { ICategory, ICategoryCreate } from '@/interfaces'
import { api } from '@/utils'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoryList: [] as ICategory[],
  }),
  actions: {
    async getCategoryList() {
      try {
        const { data } = await api.get('/categories/')
        this.categoryList = data
      } catch (error) {
        console.error('Category store E: ', error)
      }
    },
    async createCategory(dataCreate: ICategoryCreate) {
      try {
        const res = await api.post('/categories', {...dataCreate})
        return res
      } catch (error) {
        console.error('Create category E:', error)
      }
    }
  }
})