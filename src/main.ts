import { createApp } from 'vue'
import plugins from '@/plugins'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入批量注册的组件
import baseComponents from '@/components/index'
//element 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入全局样式
import '@/assets/styles/main.less'
//CSS 重置
import 'normalize.css'
//自定义全局样式
import '@/assets/styles/common.less'

//自定义全局指令
import directive from '@/utils/index'

// 禁用调试包
// import DisableDevtool from 'disable-devtool'
// const options = {
//   disableIframeParents: true,
//   disableDevtoolAuto: true,
//   md5: 'dd55cec2ce59aca4e6647dcfbc90dc27'
// }

// DisableDevtool(options)

const app = createApp(App)

app.config.globalProperties.$DisableRightClick = true
app.config.globalProperties.$DebugMode = false
app.config.globalProperties.$DisableF12 = true
app.config.globalProperties.$DisableDevTools = true
// 注册自定义指令

app.directive('slide', directive)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(baseComponents)
app.use(router)
app.use(ElementPlus, { size: 'small' })
app.use(plugins)
app.mount('#app')

// if (import.meta.env.PROD) {
//   // 在生产环境下执行的代码
//   document.addEventListener('contextmenu', (e) => {
//     if (app.config.globalProperties.$DisableRightClick) {
//       e.preventDefault()
//       window.alert('本站已禁止右键!')
//       app.config.globalProperties.$message.error('本站已禁止右键!')
//     }
//   })
//   document.addEventListener('keydown', (e) => {
//     if (app.config.globalProperties.$DisableF12 && e.key === 'F12') {
//       e.preventDefault()
//       window.alert('本站已禁止右键!')
//       app.config.globalProperties.$message.error('本站已禁止F12!')
//     }
//   })

//   if (app.config.globalProperties.$DisableDevTools) {
//     const element = document.createElement('script')
//     element.textContent = `
//     (function(window, document) {
//       window.alert = function(message) {
//         console.log(message);
//       };
//     })(window, document);
//   `
//     document.head.append(element)
//   }
// }
