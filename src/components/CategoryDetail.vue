<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useCategoriesStore } from '@/stores/category'

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoriesStore()

const categoryFormData = reactive({
  name: '',
  image: '',
})
const categoryId = ref()

const isCreating = computed(() => {
  const slug = route.params.slug
  if (slug === 'create') {
    return true
  } else {
    categoryId.value = slug
    return false
  }
})

async function onSubmit() {
  if (isCreating) {
    const res = await categoryStore.createCategory(categoryFormData)
    if (res?.statusText === 'OK') {
      router.push('/categories')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  } else {

  }
}

function onCancel() {

}
</script>

<template>
  <el-form :model="categoryFormData" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="categoryFormData.name" />
    </el-form-item>
    <el-form-item label="Image Link">
      <el-input v-model="categoryFormData.image" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{ isCreating ? 'Create' : 'Update' }}</el-button>
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