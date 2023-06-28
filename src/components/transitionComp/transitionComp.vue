<script setup lang="ts">
import { ref } from 'vue'
import breathingLight from './breathingLight.vue'
import prettyBtn from './prettyBtn.vue'
import Line from './line.vue'
import transitionBG from './transitionBG.vue'
import md from './index.md?raw'
</script>

<template>
  <div class="my-demo">
    <div class="title">
      一些简单的css效果
      <div>
        <Line :md="md"></Line>
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
        <Line></Line>
      </div>
      <div class="item">
        <transitionBG></transitionBG>
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
  margin-right: 20px;
  float: left;
}
</style>
