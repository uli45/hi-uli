// 保存与用户相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { compInfo } from '@/types/compInfo'

export const compStore = defineStore(
  'compStore',
  () => {
    // 用户信息

    const keys = ref<compInfo[]>([])
    // 设置
    const setKey = (keyList: compInfo) => {
      keys!.value.push(keyList)
      console.log(keys.value)
    }
    const clearKeys = () => {
      keys.value = []
    }

    return { setKey, keys, clearKeys }
  },
  {
    persist: true
  }
)
