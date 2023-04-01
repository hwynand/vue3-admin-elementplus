<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useProductsStore } from '@/stores/product'

const productStore = useProductsStore()
const router = useRouter()
productStore.getProductList()

function handleEdit(id: number) {
  router.push('/products/' + id)
}

function handleDelete(id: number) {
  ElMessageBox.confirm(
    'Delete this product?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      productStore.deleteProduct(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

</script>

<template>
  <el-table :data="productStore.productList" stripe>
    <el-table-column prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="category.name" label="Category" width="180" />
    <el-table-column prop="brand.name" label="Brand" width="180" />
    <el-table-column prop="description" label="Description" width="480" />
    <el-table-column prop="product_variants" label="Variants" width="280">
      <template #default="scope">
        <ul>
          <li v-for="variant in scope.row.product_variants" :key="variant.id">
            {{ variant.name }}
          </li>
        </ul>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row.id)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.row.id)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>