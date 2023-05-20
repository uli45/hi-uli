import imgChangeBackground from '@/components/imgChangeBackground.vue'
declare module 'vue' {
  interface GlobalComponents {
    imgChangeBackground: typeof imgChangeBackground
  }
}
