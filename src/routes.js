import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Customer from './views/Customer.vue'

import TaxCalculate from './views/TaxCalculate.vue'
import TaxManage from './views/TaxManage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/manage',
    name: 'TaxManage',
    component: TaxManage
  },
  {
    path: '/report',
    name: 'TaxCalculate',
    component: TaxCalculate
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
