<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <router-link to="/">
    <el-image src="https://element-plus.org/images/element-plus-logo.svg" class="logo"/>
  </router-link>
  <el-avatar :size="50">admin</el-avatar>
</template>

<style scoped>
.logo {
  height: 50px;
}

</style>