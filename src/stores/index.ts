import { createPinia } from 'pinia'
//数据持久化插件
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia
// 统一导出 store
export * from './comp'
