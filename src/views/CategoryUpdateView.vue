<script setup lang="ts">
import { useRoute } from 'vue-router'
import CategoryDetail from '@/components/CategoryDetail.vue'

const route = useRoute()
const categoryId = route.params.id as string

</script>

<template>
  <category-detail type="update" :category-id="categoryId" />
</template>
