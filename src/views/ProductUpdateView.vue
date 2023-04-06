<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProductDetail from '@/components/ProductDetail.vue'

const route = useRoute()
const productId = route.params.id as string

</script>

<template>
  <product-detail type="update" :product-id="productId" />
</template>
