<script setup lang="ts">
import { reactive, defineProps, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useBrandsStore } from '@/stores/brand'

export interface Props {
  type: 'create' | 'update',
  brandId?: string,
}

const props = defineProps<Props>()

const router = useRouter()
const brandStore = useBrandsStore()
const brandFormData = reactive({
  name: '',
  // image: '',
})

if (props.type === 'update') {
  brandStore.getBrand(props.brandId!)
}

watch(
  () => brandStore.brand,
  () => {
    if (brandStore.brand) {
      brandFormData.name = brandStore.brand.name
      // brandFormData.image = brandStore.brand.image
    }
  }
)

async function onSubmit() {
  if (props.type === 'create') {
    const res = await brandStore.createBrand(brandFormData)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully created.')
      router.push('/brands')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  } else if (props.type === 'update') {
    const res = await brandStore.updateBrand(props.brandId!, brandFormData)
    if (res?.statusText === 'OK') {
      ElMessage.success('Successfully updated.')
      router.push('/brands')
    } else {
      ElMessage.error('Oops, some thing went wrong.')
    }
  }
}

function onCancel() {
  router.push('/brands')
}
</script>

<template>
  <el-form :model="brandFormData" label-width="120px">
    <el-form-item label="Name">
      <el-input v-model="brandFormData.name" />
    </el-form-item>
    <!-- <el-form-item label="Image Link">
            <el-input v-model="brandFormData.image" />
          </el-form-item>
          <el-image :src="brandFormData.image" /> -->
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