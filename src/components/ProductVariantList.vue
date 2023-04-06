<script setup lang="ts">
import { reactive, ref, defineProps } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { Search } from '@element-plus/icons-vue'

import { useProductVariantsStore } from '@/stores/product-variant'

export interface Props {
  productId: string,
}

const props = defineProps<Props>()
const productVariantStore = useProductVariantsStore()

const router = useRouter()
productVariantStore.getProductVariantList(props.productId)


function handleEdit(id: number) {
  router.push('/products/' + id)
}

// function handleDelete(id: number) {
//   ElMessageBox.confirm(
//     'Delete this product?',
//     'Warning',
//     {
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel',
//       type: 'warning',
//     }
//   )
//     .then(() => {
//       productVariantStore.deleteProduct(id)
//     })
//     .catch(() => {
//       ElMessage({
//         type: 'info',
//         message: 'Delete canceled',
//       })
//     })
// }
</script>

<template>
  <div>
    <div class="head-actions">
      <router-link to="/products/create">
        <el-button type="success" plain>
          <Icon icon="ep:plus" />
          New Variant
      </el-button>
      </router-link>
    </div>
    <!-- <div class="filter-options">
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
              </div> -->

    <el-table :data="productVariantStore.productVariantList" stripe>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="color" label="Color" width="180" />
      <el-table-column prop="sku" label="SKU" width="180" />
      <el-table-column prop="price" label="Price" width="180" />
      <el-table-column prop="inventory" label="Inventory" width="180" />
      <!-- <el-table-column prop="product_variants" label="Variants" width="280">
            <template #default="scope">
              <ul>
                <li v-for="variant in scope.row.product_variants" :key="variant.id">
                  {{ variant.name }}
                </li>
              </ul>
            </template>
          </el-table-column> -->
      <el-table-column label="Actions" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-button size="small" type="danger">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="productStore.totalProduct" hide-on-single-page
              @current-change="changePage" /> -->
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
