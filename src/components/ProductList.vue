<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

import { useProductsStore } from '@/stores/product'
import { useCategoriesStore } from '@/stores/category'
import { useBrandsStore } from '@/stores/brand'
import type { IGetProductListParams } from '@/interfaces';

const productStore = useProductsStore()
const categoryStore = useCategoriesStore()
const brandStore = useBrandsStore()

const router = useRouter()
const getProductListParams: IGetProductListParams = reactive({})
productStore.getProductList(getProductListParams)

const categories = ref([])
categoryStore.getCategoryList({})
function handleChangeCategory(newCategories: number[]) {
  getProductListParams.category_id = newCategories
  productStore.getProductList(getProductListParams)
}

const brands = ref([])
brandStore.getBrandList({})
function handleChangeBrand(newBrands: number[]) {
  getProductListParams.brand_id = newBrands
  productStore.getProductList(getProductListParams)
}

const searchKeyword = ref()
function handleSearchByKeyword() {
  getProductListParams.keyword = searchKeyword.value
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
    <div class="head-actions">
      <router-link to="/products/create">
        <el-button type="success" plain>
          <Icon icon="ep:plus" />
          New Product
        </el-button>
      </router-link>
    </div>
    <div class="filter-options">
      <el-select v-model="categories" @change="handleChangeCategory" multiple placeholder="Category" size="large">
        <el-option v-for="category in categoryStore.categoryList" :key="category.id" :label="category.name"
          :value="category.id" />
      </el-select>
      <el-select v-model="brands" @change="handleChangeBrand" multiple placeholder="Brand" size="large">
        <el-option v-for="brand in brandStore.brandList" :key="brand.id" :label="brand.name" :value="brand.id" />
      </el-select>
      <el-input v-model="searchKeyword" placeholder="Press Enter to search" clearable size="large"
        @keyup.enter="handleSearchByKeyword">
        <template #prefix>
          <el-icon>
            <search />
          </el-icon>
        </template>
      </el-input>
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
    <el-pagination background layout="prev, pager, next" :total="productStore.totalProduct" hide-on-single-page
      @current-change="changePage" />
  </div>
</template>

<style scoped>
.head-actions {
  margin: 0 0 15px 0;
  display: flex;
  justify-content: end;
}

.el-pagination {
  justify-content: end;
  margin: 15px;
}

.filter-options {
  margin-bottom: 10px;
  display: flex;
}

.el-select {
  margin: 0 10px;
}
</style>
