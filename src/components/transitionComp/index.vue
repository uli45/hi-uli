<script setup lang="ts">
import { ref } from 'vue'
import breathingLight from './breathingLight.vue'
import prettyBtn from './prettyBtn.vue'
import Line from './line.vue'
import md from './index.md?raw'
</script>

<template>
  <div class="my-demo">
    <div class="title">一些简单的css动画效果 
      <div>
        <Line  :md="md"></Line>
      </div>
    </div>
    <div class="itemBox">
      <div class="item">
        <prettyBtn></prettyBtn>
      </div>
      <div class="item">
        <breathingLight></breathingLight>
      </div>
      <div class="item">
        <Line  ></Line>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.my-demo {
  padding: 10px;
  .title {
    margin-bottom: 20px;
    div {
      display: inline-block;
    }
  }
}
.item {
  display: inline-block;
  margin-right: 20px;
  border-radius: 5px;
  overflow: hidden;
}
</style>
