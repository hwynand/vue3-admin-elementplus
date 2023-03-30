import {
  Menu as IconMenu,
  DataAnalysis,
  User,
  Reading,
  Cellphone,
  ShoppingCart,
} from '@element-plus/icons-vue'

export const MENU = [
  {
    index: "1",
    icon: DataAnalysis,
    to: '/dashboard',
    name: 'Dashboard'
  },
  {
    index: "2",
    icon: User,
    to: '/users',
    name: 'Users'
  },
  {
    index: "3",
    icon: Cellphone,
    to: '/products',
    name: 'Products'
  },
  {
    index: "4",
    icon: ShoppingCart,
    to: '/orders',
    name: 'Orders'
  },
  {
    index: "5",
    icon: Reading,
    to: '/articles',
    name: 'Article'
  },
]