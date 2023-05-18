import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入全局样式
import './styles/main.less'
//CSS 重置
import 'normalize.css'
//自定义全局样式
import '@/assets/styles/common.less'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
