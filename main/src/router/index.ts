import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { // 重定向
    path: '/',
    redirect: '/menu'
  },
  { // 菜单
    path: '/menu',
    component: () => import('@/views/menu/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
