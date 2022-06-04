import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { // 重定向
    path: '/',
    redirect: '/home'
  },
  { // 首页
    path: '/home',
    component: () => import('../views/index.vue')
  }
]

export default routes
