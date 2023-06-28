// 保存与用户相关的数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { compInfo } from '@/types/compInfo'

export const compStore = defineStore(
  'compStore',
  () => {
    const keys = ref<compInfo[]>([])
    const activeKey = ref('')
    // 设置
    const setKey = (keyList: compInfo) => {
      keys!.value.push(keyList)
      // console.log(keys.value)
    }
    const clearKeys = () => {
      keys.value = []
    }
    const changeActiveKey = (key: string) => {
      activeKey.value = key
    }
    return { setKey, keys, clearKeys, activeKey, changeActiveKey }
  },
  {
    persist: true
  }
)
