import { defineStore } from 'pinia'

import type { IProduct } from '@/interfaces'
import { api } from '@/utils'

export const useProductsStore = defineStore('products', {
  state: () => ({
    productList: [] as IProduct[],
  }),
  actions: {
    async getProductList() {
      try {
        const { data, status } = await api.get<IProduct[]>('/products/')
        this.productList = data
      } catch (error) {
        console.error('Product store E:', error)
      }
    },
    async deleteProduct(id: number) {
      try {
        const { data } = await api.delete<IProduct>('/products/' + id)
        this.getProductList()
      } catch (error) {
        console.error('Delete Product E: ', error)
      }
    }
  }
})
