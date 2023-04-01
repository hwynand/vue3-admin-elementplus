<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  username: '',
  password: '',
})

async function submitLogin() {
  await authStore.login(formData)
  router.push('/')
}
</script>

<template>
  <el-form :model="formData" label-width="120px" size="large">
    <el-form-item label="Email">
      <el-input v-model="formData.username" placeholder="Enter email" />
    </el-form-item>
    <el-form-item label="Password">
      <el-input v-model="formData.password" type="password" autocomplete="off" placeholder="Enter password"
        show-password />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitLogin">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.el-form {
  width: 100%;
}
</style>