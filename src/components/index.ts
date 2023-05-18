import type { App } from 'vue'
import Child1Vue from './Child1.vue'
const components = [{ title: 'Child1', componentName: Child1Vue }]
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
