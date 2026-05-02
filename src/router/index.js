import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Memory from '../components/Memory.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/memoria',
    name: 'Memoria',
    component: Memory,
  }
]

const router = createRouter({
  history: createWebHashHistory(), // Ideal para GitHub Pages
  routes
})

export default router