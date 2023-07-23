import type { App } from 'vue'
import { compStore } from '@/stores/comp'
import imgChangeBackground from './imgChangeBackground/imgChangeBackground.vue'
import myLove from './myLove/myLove.vue'
import cssLoading from './cssLoading.vue'
import transitionLine from './transitionComp/transitionComp.vue'
import files from './files/files.vue'
import smoothness from './smoothness/smoothness.vue'
import ParticleClock from './ParticleClock/ParticleClock.vue'
import JustWatched from './JustWatched/JustWatched.vue'
import anyLineInBezier from './anyLineInBezier/anyLineInBezier.vue'
import cssClock from './cssClock/cssClock.vue'
import algorithmVisualizationComponent from './algorithmVisualizationComponent/algorithmVisualizationComponent.vue'
const components = [
  {
    title: 'cssClock',
    componentName: cssClock,
    desc: '一个完全css实现的时钟'
  },
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
    title: 'smoothness',
    componentName: smoothness,
    desc: '一个简单的vue自定义指令 -- 平滑移动 '
  },
  // {
  //   title: 'ParticleClock',
  //   componentName: ParticleClock,
  //   desc: 'canvas 粒子时钟效果'
  // },
  {
    title: 'JustWatched',
    componentName: JustWatched,
    desc: '实现抖音刚刚看过效果'
  },
  {
    title: 'anyLineInBezier',
    componentName: anyLineInBezier,
    desc: '利用贝塞尔曲线实现任意2点之间连线'
  },
  {
    title: 'transitionLine',
    componentName: transitionLine,
    desc: '一些简单的css效果'
  },
  {
    title: 'algorithmVisualizationComponent',
    componentName: algorithmVisualizationComponent,
    desc: '几个常见的排序算法可视化'
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
