import type { App } from 'vue'
import imgChangeBackground from './imgChangeBackground.vue'
const components = [{ title: 'imgChangeBackground', componentName: imgChangeBackground }]
const keys: Array<{ title: string; name: string }> = []
export default {
  install(app: App) {
    components.forEach((item) => {
      keys.push({
        title: item.title,
        name: item.componentName.__name as string
      })
      // 通过循环遍历数据批量注册组件

      app.component(item.componentName.__name as string, item.componentName)
    })
    window.localStorage.setItem('keys', JSON.stringify(keys))
  }
}
