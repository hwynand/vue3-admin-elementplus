import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import type { ICategory, ICategoryCreate, ICategoryUpdate, IGetCategoryParams } from '@/interfaces'
import { api } from '@/utils'
import { API_ENDPOINTS } from '@/constants'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categoryList: [] as ICategory[],
    category: null as ICategory | null,
  }),
  actions: {
    async getCategoryList(params: IGetCategoryParams) {
      try {
        const { data } = await api.get(API_ENDPOINTS.categories, { params })
        this.categoryList = data
      } catch (error) {
        console.error('Category store E: ', error)
      }
    },
    async createCategory(dataCreate: ICategoryCreate) {
      try {
        const res = await api.post(API_ENDPOINTS.categories, { ...dataCreate })
        return res
      } catch (error) {
        console.error('Create category E:', error)
      }
    },
    async getCategory(categoryId: string) {
      try {
        const { data } = await api.get(API_ENDPOINTS.categories + categoryId)
        this.category = data
      } catch (error) {
        console.error('get category E:', error)
      }
    },
    async updateCategory(categoryId: string, dataUpdate: ICategoryUpdate) {
      try {
        const res = await api.put(API_ENDPOINTS.categories + categoryId, { ...dataUpdate })
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async deleteCategory(categoryId: string) {
      try {
        const { statusText } = await api.delete(API_ENDPOINTS.categories + categoryId)
        if (statusText === 'OK') {
          ElMessage({
            type: 'success',
            message: 'Category deleted',
          })
          this.getCategoryList({})
        } else {
          ElMessage({
            type: 'error',
            message: 'Some things went wrong',
          })
        }
      } catch (error) {
        ElMessage({
          type: 'error',
          message: 'Some things went wrong',
        })
      }
    }
  }
})