<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import textLine from '@/components/transitionComp/line.vue'
import md from './index.md?raw'
const count = ref(0)
const load = () => {
    return
}
onMounted(() => {
    // return
    count.value = 100
    for (let i = 0; i < count.value; i++) {
        randomColor()
    }
})

const colorList = ref<string[]>([])

const randomColor = () => {
    const letters: string = '0123456789ABCDEF'
    let color: string = '#'
    for (let i: number = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    colorList.value.push(color)
}
</script>
<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <div class="text">
      <textLine :md="md" />
    </div>
    <li
      v-for="i in count"
      v-slide="{ duration: 1000, easing: 'ease', translateY: 150 }"
      :key="i"
      class="infinite-list-item"
      :style="{ backgroundColor: colorList[i] }"
    >
      {{ colorList[i] }}
    </li>
  </ul>
</template>

<style scoped lang="less">
.infinite-list {
  height: 100vh;
  padding: 0;
  margin: 0;
  list-style: none;
  position: relative;
  .text {
    position: absolute;
    top: 10px;
    left: 10px;
  }
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}

</style>
