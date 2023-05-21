<script setup lang="ts">
import {} from 'vue'
</script>

<template>
  <div class="my-demo">
    <div class="title">
      简约的动态关注按钮，简单易用
      <p>
        此效果主要使用 css 伪选择器配合 css content 属性，以及
        transition(过渡)属性来实现一个简约的动态按钮效果。
      </p>
    </div>
    <div class="prettyBtn">
      <button class="btn">关注我</button>
    </div>
  </div>
</template>

<style lang="less">
.my-demo {
  .title {
    // background-color: pink;
    padding: 5px;
    height: 60px;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-indent: 2em;
    p {
      margin-top: 5px;
      text-indent: 4em;
      color: #929090;
      font-size: 12px;
    }
  }
  .prettyBtn {
    width: 100%;
    height: calc(100% - 60px);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      width: 140px;
      height: 46px;
      font-size: 16px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 700;
      color: #333;
      background-color: transparent;
      border: none;
      z-index: 5;
      position: relative;
      box-sizing: border-box;
      transition: all 0.4s ease-in-out;
      &::after {
        content: '';
        width: 4px;
        height: inherit;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -5;
        background-color: #333;
        transition: all 0.4s ease-in-out;
      }
      &:hover {
        cursor: pointer;
        color: #fff;
        &::after {
          width: 100%;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
