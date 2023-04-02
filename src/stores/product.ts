import { defineStore } from 'pinia'

import type { IProduct } from '@/interfaces'
import { api } from '@/utils'
import type { IGetProductListParams } from '@/interfaces'

export const useProductsStore = defineStore('products', {
  state: () => ({
    totalProduct: null as number | null,
    productList: [] as IProduct[],
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
    async deleteProduct(id: number) {
      try {
        const { data } = await api.delete<IProduct>('/products/' + id)
      } catch (error) {
        console.error('Delete Product E: ', error)
      }
    }
  }
})
