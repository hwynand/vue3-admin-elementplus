import { defineStore } from 'pinia'

import type { IProduct, ICategory, IGetProductListParams, IProductCreate } from '@/interfaces'
import { api } from '@/utils'
import { API_ENDPOINTS } from '@/constants'

export const useProductsStore = defineStore('products', {
  state: () => ({
    totalProduct: null as number | null,
    productList: [] as IProduct[],
    categoryList: [] as ICategory[],
  }),
  actions: {
    async getProductList(params: IGetProductListParams) {
      try {
        const { data, status } = await api.get('/products/', { params })
        this.productList = data.results
        this.totalProduct = data.total
      } catch (error) {
        console.error('Product store E:', error)
      }
    },
    async createProduct(dataCreate: IProductCreate) {
      try {
        const res = await api.post(API_ENDPOINTS.products, { ...dataCreate })
        return res
      } catch (error) {
        console.error(error)
      }
    },
    async deleteProduct(id: number) {
      try {
        const { data } = await api.delete<IProduct>('/products/' + id)
      } catch (error) {
        console.error('Delete Product E: ', error)
      }
    },
  }
})
