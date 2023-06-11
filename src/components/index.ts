import type { App } from 'vue'
import { compStore } from '@/stores/comp'
import imgChangeBackground from './imgChangeBackground/imgChangeBackground.vue'
import myLove from './myLove/myLove.vue'
import cssLoading from './cssLoading.vue'
import transitionLine from './transitionComp/index.vue'
import files from './files/files.vue'
import smoothness from './smoothness/smoothness.vue';
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
    title: 'files',
    componentName: files,
    desc: '一个纯css实现的文件夹'
  },
  {
    title: 'transitionLine',
    componentName: transitionLine,
    desc: '一些简单的动画组件'
  },
  {
    title: 'smoothness',
    componentName: smoothness,
    desc: '一个简单的vue 自定义指令'
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
