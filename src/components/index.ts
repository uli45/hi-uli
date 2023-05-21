import type { App } from 'vue'
import { compStore } from '@/stores/comp'
import imgChangeBackground from './imgChangeBackground.vue'
import myLove from './myLove.vue'
import cssLoading from './cssLoading.vue'
import breathingLight from './breathingLight.vue'
import prettyBtn from './prettyBtn.vue'
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
  },
  {
    title: 'cssLoading',
    componentName: cssLoading,
    desc: '一个非常好用的loading效果网站'
  },
  {
    title: 'breathingLight',
    componentName: breathingLight,
    desc: '一个好看的css呼吸灯效果'
  },
  {
    title: 'prettyBtn',
    componentName: prettyBtn,
    desc: '简约的动态关注按钮，简单易用'
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
