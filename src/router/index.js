import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "about" */ '../components/Table.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../components/History.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
