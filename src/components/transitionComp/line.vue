<script setup lang="ts">
import { ref } from 'vue'
import myDrawer from '../myDrawer.vue'

const props = defineProps({
    md: {}
})

const change = () => {
  if (!props.md) return
  showDrawer.value = true
}
const showDrawer = ref(false)
</script>

<template>
  <div @click="change" class="line pointer">
    {{ props.md ? '查看代码' : '鼠标悬浮后底部出现线条并向两边延展' }}
  </div>
  <myDrawer v-model="showDrawer" :text="props.md"></myDrawer>
</template>

<style scoped lang="less">
.line {
  position: relative;
  padding-bottom: 6px;
  &::after {
    content: ' ';
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 50%;
    display: block;
    width: 100%;
    height: 2px;
    transform: translate(-50%);
    transition: all 0.5s;
    animation: del_width 0.5s ease forwards;
  }
  &:hover {
    &::after {
      height: 2px;
      animation: add_width 0.5s ease forwards;
      background: @xtxColor;
    }
  }
}

@keyframes add_width {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}
@keyframes del_width {
  from {
    width: 100%;
  }

  to {
    width: 0;
  }
}
</style>
