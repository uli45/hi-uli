<script lang="ts" setup name="Layout"></script>
<template>
  <div class="Layout">
    <div class="head">
      <div class="right">
        <el-button>Default</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.Layout {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  .head {
    height: 50px;
    border-bottom: 1px solid #ccc;
    .right {
      float: right;
      width: 50%;
      height: 100%;
      background-color: pink;
    }
  }
}
</style>
