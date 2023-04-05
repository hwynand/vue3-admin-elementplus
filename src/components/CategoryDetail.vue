<script setup lang="ts">
import { reactive, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useCategoriesStore } from '@/stores/category'

export interface Props {
  type: 'create' | 'update',
  categoryId?: string,
}

const props = defineProps<Props>()

const router = useRouter()
const categoryStore = useCategoriesStore()
const categoryFormData = reactive({
  name: '',
  image: '',
})

if (props.type === 'update') {
  categoryStore.getCategory(props.categoryId!)
}

watch(
  () => categoryStore.category,
  () => {
    if (categoryStore.category) {
      categoryFormData.name = categoryStore.category.name
      categoryFormData.image = categoryStore.category.image
    }
  }
)

async function onSubmit() {
  if (props.type === 'create') {
    const res = await categoryStore.createCategory(categoryFormData)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully created.')
      router.push('/categories')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  } else if (props.type === 'update') {
    const res = await categoryStore.updateCategory(props.categoryId!, categoryFormData)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully updated.')
      router.push('/categories')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
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
    <el-image :src="categoryFormData.image" />
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