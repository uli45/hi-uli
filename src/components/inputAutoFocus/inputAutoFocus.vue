<script setup lang="ts">
import {} from 'vue'

import textLine from '../transitionComp/line.vue'
import md from './index.md?raw'
</script>

<template>
  <div class="my-demo input-auto-focus">
    <div class="title">
      <span>兼容安卓和ios 跳转页面 input 自动聚焦</span>
      <textLine :md="md"></textLine>
    </div>

    <p>
      在最近一次的开发项目中，有个需求就是跳转到搜索页，需要自动聚焦， 项目是用uniapp
      和uview组件库开发的，uview的搜索组件自动聚焦
      在安卓上是可以自动触发的，但是ios不能触发，化身面向百度编程，查询到是因为ios自身的安全设定问题不能自动聚焦，需要用户手动触发
    </p>
    <p>
      百度了许久，终于找到了一篇文章，能实现此效果，特此记录下 链接：
      <a href="https://www.cnblogs.com/wiliam/p/17390780.html" target="_blank">
        https://www.cnblogs.com/wiliam/p/17390780.html</a
      >
    </p>
    <div>
      <p>以防丢失 特此记录一份</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.input-auto-focus {
  padding: 20px;
}
.title {
  font-size: 18px;
  font-weight: 500;
  height: 30px;
  display: flex;
  span {
    margin-right: 20px;
  }
}
</style>
