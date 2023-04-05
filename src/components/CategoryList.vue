<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

import { useCategoriesStore } from '@/stores/category'
import type { IGetCategoryParams } from '@/interfaces';

const categoryStore = useCategoriesStore()

const router = useRouter()
const getCategoryListParams: IGetCategoryParams = reactive({})
categoryStore.getCategoryList(getCategoryListParams)

const searchKeyword = ref()
function handleSearchByKeyword() {
  getCategoryListParams.keyword = searchKeyword.value
  categoryStore.getCategoryList(getCategoryListParams)
}

function handleEdit(id: number) {
  router.push('/categories/' + id)
}

function handleDelete(id: string) {
  ElMessageBox.confirm(
    'Delete this category?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      categoryStore.deleteCategory(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// function changePage(page: number) {
//   getCategoryListParams.page = page
//   productStore.getProductList(getProductListParams)
// }

</script>

<template>
  <div>
    <div class="head-actions">
      <router-link to="/categories/create">
        <el-button type="success" plain>
          <Icon icon="ep:plus" />
          New Category
        </el-button>
      </router-link>
    </div>
    <div class="filter-options">
      <el-input v-model="searchKeyword" placeholder="Press Enter to search" clearable size="large"
        @keyup.enter="handleSearchByKeyword">
        <template #prefix>
          <el-icon>
            <search />
          </el-icon>
        </template>
      </el-input>
    </div>
    <!-- <el-text class="mx-1" size="large">{{ categoryStore.c }} products</el-text> -->
    <el-table :data="categoryStore.categoryList" stripe>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="Name" width="580" />
      <el-table-column prop="image" label="Image" width="680">
        <template #default="scope">
          <el-image :src="scope.row.image" />
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="280">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="categoryStore.totalProduct" hide-on-single-page
            @current-change="changePage" /> -->
  </div>
</template>

<style scoped>
.head-actions {
  margin: 0 0 15px 0;
  display: flex;
  justify-content: end;
}

.el-form {
  margin: 0 auto;
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
