<script setup lang="ts">
import {} from 'vue'
import breathingLight from './breathingLight.vue'
import prettyBtn from './prettyBtn.vue'
import Line from './line.vue'
</script>

<template>
  <div class="my-demo">
    <div class="title">一些简单的css动画效果</div>
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
    </div>
  </div>
</template>

<style scoped lang="less">
.item {
  display: inline-block;
  margin-right: 20px;
}
</style>
