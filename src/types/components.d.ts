import imgChangeBackground from '@/components/imgChangeBackground.vue'
import myLove from '@/components/myLove.vue'
declare module 'vue' {
  interface GlobalComponents {
    imgChangeBackground: typeof imgChangeBackground
    myLove: typeof myLove
  }
}
