<script setup lang="ts">
import { useRoute } from 'vue-router'
import BrandDetail from '@/components/BrandDetail.vue'

const route = useRoute()
const brandId = route.params.id as string

</script>

<template>
  <brand-detail type="update" :brand-id="brandId" />
</template>
