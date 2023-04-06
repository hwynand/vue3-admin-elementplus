<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

import { useBrandsStore } from '@/stores/brand'
import type { IGetBrandParams } from '@/interfaces';

const brandStore = useBrandsStore()

const router = useRouter()
const getBrandListParams: IGetBrandParams = reactive({})
brandStore.getBrandList(getBrandListParams)

const searchKeyword = ref()
function handleSearchByKeyword() {
  getBrandListParams.keyword = searchKeyword.value
  brandStore.getBrandList(getBrandListParams)
}

function handleEdit(id: number) {
  router.push('/brands/' + id)
}

function handleDelete(id: string) {
  ElMessageBox.confirm(
    'Delete this brand?',
    'Warning',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      brandStore.deleteBrand(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

// function changePage(page: number) {
//   getBrandListParams.page = page
//   productStore.getProductList(getProductListParams)
// }

</script>

<template>
  <div>
    <div class="head-actions">
      <router-link to="/brands/create">
        <el-button type="success" plain>
          <Icon icon="ep:plus" />
          New Brand
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
    <!-- <el-text class="mx-1" size="large">{{ brandStore.c }} products</el-text> -->
    <el-table :data="brandStore.brandList" stripe>
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="Name" width="580" />
      <!-- <el-table-column prop="image" label="Image" width="680">
          <template #default="scope">
            <el-image :src="scope.row.image" />
          </template>
        </el-table-column> -->
      <el-table-column label="Actions" width="280">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination background layout="prev, pager, next" :total="brandStore.totalProduct" hide-on-single-page
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
