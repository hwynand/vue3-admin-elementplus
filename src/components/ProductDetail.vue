<script setup lang="ts">
import { reactive, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useProductsStore } from '@/stores/product'
import { useCategoriesStore } from '@/stores/category'
import { useBrandsStore } from '@/stores/brand'
import type { IProductCreate, IProductUpdate } from '@/interfaces'

import AppEditor from '@/components/AppEditor.vue'

export interface Props {
  type: 'create' | 'update',
  productId?: string,
}

const props = defineProps<Props>()

const router = useRouter()
const productStore = useProductsStore()
const categoryStore = useCategoriesStore()
const brandStore = useBrandsStore()
categoryStore.getCategoryList({})
brandStore.getBrandList({})

const productFormData: IProductCreate = reactive({
  name: '',
  category_id: null,
  brand_id: null,
  description: '',
})

if (props.type === 'update') {
  productStore.getProduct(props.productId!)
}

watch(
  () => productStore.product,
  () => {
    if (productStore.product) {
      productFormData.name = productStore.product.name
      productFormData.category_id = productStore.product.category.id
      productFormData.brand_id = productStore.product.brand.id
      productFormData.description = productStore.product.description
    }
  }
)

async function onSubmit() {
  if (props.type === 'create') {
    const res = await productStore.createProduct(productFormData)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully created.')
      router.push('/products')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  }
  else if (props.type === 'update') {
    const res = await productStore.updateProduct(props.productId!, productFormData as IProductUpdate)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully updated.')
      router.push('/products')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  }
}

function onCancel() {
  router.push('/products')
}
</script>

<template>
  <el-form :model="productFormData" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="productFormData.name" placeholder="Product name" />
    </el-form-item>
    <el-form-item label="Category">
      <el-select v-model="productFormData.category_id" placeholder="Category">
        <el-option v-for="category in categoryStore.categoryList" :key="category.id" :label="category.name"
          :value="category.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="Brand">
      <el-select v-model="productFormData.brand_id" placeholder="Brand">
        <el-option v-for="brand in brandStore.brandList" :key="brand.id" :label="brand.name" :value="brand.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="Description">
      <app-editor v-model="productFormData.description" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ props.type === 'create' ? 'Create' : 'Update' }}</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  margin: auto;
  max-width: 1000px;
}
</style>