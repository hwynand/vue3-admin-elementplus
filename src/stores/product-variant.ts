import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import type { IProductVariant } from '@/interfaces'
import { api } from '@/utils'
import { API_ENDPOINTS } from '@/constants'

export const useProductVariantsStore = defineStore('product variants', {
  state: () => ({
    productVariantList: [] as IProductVariant[],
    productVariant: null as IProductVariant | null,
  }),
  actions: {
    async getProductVariantList(productId: string) {
      try {
        const { data } = await api.get('/product-variants/products/' + productId + '/variants')
        this.productVariantList = data
      } catch (error) {
        console.error('Product store E:', error)
      }
    },
    // async createProduct(dataCreate: IProductCreate) {
    //   try {
    //     const res = await api.post(API_ENDPOINTS.products, { ...dataCreate })
    //     return res
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    // async getProduct(productId: string) {
    //   try {
    //     const res = await api.get(API_ENDPOINTS.products + productId)
    //     this.product = res.data
    //     return res
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    // async updateProduct(productId: string, dataUpdate: IProductUpdate) {
    //   try {
    //     const res = await api.put(API_ENDPOINTS.products + productId, { ...dataUpdate })
    //     return res
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    // async deleteProduct(id: number) {
    //   try {
    //     const res = await api.delete<IProduct>('/products/' + id)
    //     return res
    //   } catch (error) {
    //     ElMessage({
    //       type: 'error',
    //       message: 'Some things went wrong',
    //     })
    //   }
    // },
  }
})
