import type { App } from 'vue'
import { compStore } from '@/stores/comp'
import imgChangeBackground from './imgChangeBackground.vue'
import myLove from './myLove.vue'

const components = [
  {
    title: 'imgChangeBackground',
    componentName: imgChangeBackground,
    desc: '这是一个根据图片主体颜色改变背景颜色的demo组件'
  },
  {
    title: 'myLove',
    componentName: myLove,
    desc: '愿许秋风离别意，散我心中意难平。'
  }
]
export default {
  install(app: App) {
    const store = compStore()
    store.clearKeys()
    components.forEach((item) => {
      store.setKey({
        title: item.title,
        componentName: item.componentName.__name as string,
        desc: item.desc
      })

      // 通过循环遍历数据批量注册组件
      app.component(item.componentName.__name as string, item.componentName)
    })
  }
}
