<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { MENU } from '@/constants'
</script>

<template>
  <el-menu>
    <router-link v-for="item in MENU" :key="item.index" :to="item.to">
      <el-menu-item :index="item.index">
        <Icon :icon="item.icon" height="1.5rem" style="margin-right: 5px"/>
        <template #title>
          {{ item.name }}
        </template>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style scoped>
.el-menu {
  min-height: calc(100vh - 60px);
}
</style>