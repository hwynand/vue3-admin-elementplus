<script setup lang="ts">
import { ElHeader } from 'element-plus';

import { useAuthStore } from '@/stores/auth'
import TheHeader from '../components/TheHeader.vue';
import TheSideBar from '../components/TheSideBar.vue';

const authStore = useAuthStore()
authStore.checkLoggedIn()
</script>

<template>
  <el-container>
    <el-header>
      <the-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <the-side-bar />
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EEEEEE;
}
</style>