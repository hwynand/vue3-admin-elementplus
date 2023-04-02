<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useProductsStore } from '@/stores/product'
import type { IGetProductListParams } from '@/interfaces';

const productStore = useProductsStore()
const router = useRouter()
const getProductListParams: IGetProductListParams = reactive({})
productStore.getProductList(getProductListParams)

const categories = ref([])
productStore.getCategoryList()
function handleChangeCategory(newCategories: number[]) {
  getProductListParams.category_id = newCategories
  productStore.getProductList(getProductListParams)
}

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

function changePage(page: number) {
  getProductListParams.page = page
  productStore.getProductList(getProductListParams)
}

</script>

<template>
  <div>
    <div class="filter-options">
      <el-select v-model="categories" @change="handleChangeCategory" multiple placeholder="Category" size="large">
        <el-option v-for="category in productStore.categoryList" :key="category.id" :label="category.name"
          :value="category.id" />
      </el-select>
    </div>
    <el-text class="mx-1" size="large">{{ productStore.totalProduct }} products</el-text>
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
          <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="productStore.totalProduct"
      @current-change="changePage" />
  </div>
</template>

<style scoped>
.el-pagination {
  justify-content: end;
  margin: 15px;
}

.filter-options {
  margin-bottom: 10px;
}
</style>