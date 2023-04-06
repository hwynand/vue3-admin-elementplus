import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRoutes } from './auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes,
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductListView.vue')
    },
    {
      path: '/products/create',
      name: 'product create',
      component: () => import('../views/ProductCreateView.vue')
    },
    {
      path: '/products/:id(\\d+)',
      name: 'product update',
      component: () => import('../views/ProductUpdateView.vue')
    },
    {
      path: '/categories',
      name: 'category list',
      component: () => import('../views/CategoryListView.vue')
    },
    {
      path: '/categories/create',
      name: 'category create',
      component: () => import('../views/CategoryCreateView.vue')
    },
    {
      path: '/categories/:id(\\d+)',
      name: 'category update',
      component: () => import('../views/CategoryUpdateView.vue')
    },
    {
      path: '/brands',
      name: 'brand list',
      component: () => import('../views/BrandListView.vue')
    },
    {
      path: '/brands/create',
      name: 'brand create',
      component: () => import('../views/BrandCreateView.vue')
    },
    {
      path: '/brands/:id(\\d+)',
      name: 'brand update',
      component: () => import('../views/BrandUpdateView.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/OrdersView.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue')
    },
  ]
})

export default router
