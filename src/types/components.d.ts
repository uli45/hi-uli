import imgChangeBackground from '@/components/imgChangeBackground/imgChangeBackground.vue'
import myLove from '@/components/myLove/myLove.vue'
import textLine from '@/components/transitionComp/line.vue'
declare module 'vue' {
  interface GlobalComponents {
    imgChangeBackground: typeof imgChangeBackground
    myLove: typeof myLove
    textLine: typeof textLine
  }
}
