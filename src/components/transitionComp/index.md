# 一些简单的动画组件
    
 - 大部分都是css3的`动画`和`过渡`实现 
- 
  
  ##  1、关注我 按钮 （主要依靠  `transition`实现）

  ```vue
    <script setup lang="ts">
import {} from 'vue'
</script>

<template>

  <div class="my-">
    <div class="prettyBtn">
      <button class="btn">关注我</button>
    </div>
  </div>
</template>

<style scoped lang="less">
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
  // height: calc(100% - 60px);
  height: 100%;
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
      background-color: @xtxColor;
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
</style>

  ```

  ## 2、breathingLight 效果 (主要依靠 `animation` 实现)
  ```vue
    <script setup lang="ts">
import {} from 'vue'
</script>

<template>
  <div class="breathingLight">
    <span class="red"></span>
    <span class="green"></span>
    <span class="blue"></span>
  </div>
</template>

<style scoped>
.breathingLight {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
}
span {
  width: 60px;
  height: 60px;
  margin: 20px;
  border-radius: 50%;
}
.red {
  animation: just1 2s ease-in-out infinite alternate;
}
.green {
  animation: just2 3s ease-in-out infinite alternate;
}
.blue {
  animation: just3 4s ease-in-out infinite alternate;
}
@keyframes just1 {
  0% {
    border: 5px solid rgba(255, 0, 0, 0);
    box-shadow: 0 0 0 rgba(255, 0, 0, 0), 0 0 0 rgba(255, 0, 0, 0) inset;
  }
  100% {
    border: 5px solid rgba(255, 0, 0, 1);
    box-shadow: 0 0 70px rgba(255, 0, 0, 0.7), 0 0 15px rgba(255, 0, 0, 0.5) inset;
  }
}
@keyframes just2 {
  0% {
    border: 5px solid rgba(0, 255, 0, 0);
    box-shadow: 0 0 0 rgba(0, 255, 0, 0), 0 0 0 rgba(0, 255, 0, 0) inset;
  }
  100% {
    border: 5px solid rgba(0, 255, 0, 1);
    box-shadow: 0 0 70px rgba(0, 255, 0, 0.7), 0 0 15px rgba(0, 255, 0, 0.5) inset;
  }
}
@keyframes just3 {
  0% {
    border: 5px solid rgba(0, 0, 255, 0);
    box-shadow: 0 0 0 rgba(0, 0, 255, 0), 0 0 0 rgba(0, 0, 255, 0) inset;
  }
  100% {
    border: 5px solid rgba(0, 0, 255, 1);
    box-shadow: 0 0 70px rgba(0, 0, 255, 0.7), 0 0 15px rgba(0, 0, 255, 0.5) inset;
  }
}
</style>

  ```

  ## 3、鼠标悬浮后底部出现线条并向两边延展效果 （主要依靠 `animation` 实现）

  ```vue
    <script setup lang="ts">
</script>

<template>
  <div  class="line pointer">鼠标悬浮后底部出现线条并向两边延展</div>
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

  ```