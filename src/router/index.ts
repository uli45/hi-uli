// 导入函数
//  createRouter：创建路由实例
//  createWebHistory：创建 history 路由模式  localhost:3000/login
//  createWebHashHistory：创建 hash 路由模式 localhost:3000/#/login
import { createRouter, createWebHashHistory } from 'vue-router'

// 创建路由对象
const router = createRouter({
  // 设置路由模式(hash)
  //  import.meta.env.BASE_URL：会去 vite.config.ts 中去取出配置项 base 中的值
  //  将来请求页面路径时，会带上这个 base 路径
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue')
    }
  ]
})

export default router
