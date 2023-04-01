<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'

import IconLogout from './icons/IconLogout.vue'

const router = useRouter()
function logout() {
  localStorage.clear()
  router.push('/login')
}
</script>

<template>
  <router-link to="/">
    <el-image src="https://element-plus.org/images/element-plus-logo.svg" class="logo"/>
  </router-link>
  <el-dropdown trigger="click" >
    <el-avatar :size="50" :icon="User"></el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="IconLogout" @click="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped>
.logo {
  height: 50px;
}
.el-avatar:hover {
  cursor: pointer;
}

</style>