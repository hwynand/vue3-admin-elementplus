import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import type { IBrand, IBrandCreate, IBrandUpdate, IGetBrandParams } from '@/interfaces'
import { api } from '@/utils'
import { API_ENDPOINTS } from '@/constants'

export const useBrandsStore = defineStore('brands', {
  state: () => ({
    brandList: [] as IBrand[],
    brand: null as IBrand | null,
  }),
  actions: {
    async getBrandList(params: IGetBrandParams) {
      try {
        const { data } = await api.get(API_ENDPOINTS.brands, { params })
        this.brandList = data
      } catch (error) {
        console.error('Brand store E: ', error)
      }
    },
    async createBrand(dataCreate: IBrandCreate) {
      try {
        const res = await api.post(API_ENDPOINTS.brands, { ...dataCreate })
        return res
      } catch (error) {
        console.error('Create brand E:', error)
      }
    },
    async getBrand(brandId: string) {
      try {
        const { data } = await api.get(API_ENDPOINTS.brands + brandId)
        this.brand = data
      } catch (error) {
        console.error('get brand E:', error)
      }
    },
    async updateBrand(brandId: string, dataUpdate: IBrandUpdate) {
      try {
        const res = await api.put(API_ENDPOINTS.brands + brandId, { ...dataUpdate })
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async deleteBrand(brandId: string) {
      try {
        const { statusText } = await api.delete(API_ENDPOINTS.brands + brandId)
        if (statusText === 'OK') {
          ElMessage({
            type: 'success',
            message: 'Brand deleted',
          })
          this.getBrandList({})
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