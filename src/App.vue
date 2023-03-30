<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/default.vue'
import EmptyLayout from './layouts/empty.vue'
import { pagesWithEmptyLayout } from './constants'

const route = useRoute()

const layout = computed(() => {
  if (pagesWithEmptyLayout.includes(route.path)) { // TODO: should using regex to match
    return EmptyLayout
  } else {
    return DefaultLayout
  }
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<style scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #EEEEEE;
}
</style>
