<script setup lang="ts">
import {} from 'vue'
</script>

<template>
  <div class="transitionBG">css背景渐变</div>
  <div class="gradientShadow">
    <img src="@/assets/images/cat.jpeg" alt="" />
  </div>
</template>

<style scoped lang="less">
.gradientShadow {
  height: 100px;
  width: 100px;
  --blur: 10px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
