import { defineStore } from 'pinia'

import type { ICategory } from '@/interfaces'
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
    }
  }
})