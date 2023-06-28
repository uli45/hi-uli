<script setup lang="ts">
import { ref } from 'vue'
import textLine from '../transitionComp/line.vue'
import md from './myLove.md?raw'
</script>

<template>
  <div class="my-demo">
    <div class="text-line">
      <textLine text="查看代码" :md="md"></textLine>
    </div>
    <div class="card">
      <input id="open" type="checkbox" />
      <label class="open" for="open"></label>
      <div class="card-front">
        <img src="@/assets/images/love.png" alt="" class="love" />
        <div class="note">Open it! 💗💗💗</div>
      </div>
      <div class="card-inside">
        <div class="text-one">
          <h1>💌520💌</h1>
          <h2>
            Your eyes are really beautiful, there are rain, sun and moon, mountains, rivers, clouds,
            flowers and birds, but my eyes are better, because I have you in my eyes.
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import url('https://fonts.googleapis.com/css?family=Lato:300|Sacramento');
input#open {
  display: none;
}
#open:checked ~ .card-front {
  transform: rotateY(-145deg);
}

#open:checked ~ .card-front:before {
  z-index: 5;
  background-color: #fff0f3;
  width: 330px;
  height: 300px;
  top: 0;
  left: 0;
  background-image: url(@/assets/images/love.gif);
  background-size: cover;
  transform: rotateY(155deg) translateX(16px);
}
.my-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2acac;
  position: relative;
  .card {
    position: relative;
    width: 300px;
    height: 300px;
    transform-style: preserve-3d;
    transform: perspective(2500px);
    transition: 0.3s;
    &-front {
      position: relative;
      background-color: #fff0f3;
      width: 300px;
      height: 300px;
      transform-origin: left;
      box-shadow: 30px 0 50px rgba(0, 0, 0, 0.3);
      transition: 0.3s;
      &:before {
        content: '';
        position: absolute;
        width: 280px;
        height: 280px;
        background-color: #f38e8e;
        top: 10px;
        left: 10px;
      }
      .note {
        position: relative;
        width: 200px;
        height: 150px;
        background-color: #fff0f3;
        top: 85px;
        left: 50px;
        color: #333;
        font: 900 35px '';
        display: flex;
        align-items: center;
        text-align: center;
        filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.3));
      }
      img {
        position: absolute;
        width: 90px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        top: 25px;
      }
    }
    &-inside {
      position: absolute;
      background-color: #fff0f3;
      width: 300px;
      height: 300px;
      z-index: -1;
      left: 0;
      top: 0;
      background-color: #f5f5f5;
      .text-one {
        position: absolute;
        color: #333;
        font-size: 15px;
        top: 30px;
        width: 300px;
        text-align: center;
        color: #ff9999;
        font-family: 'Sacramento';
        &:after {
          content: '';
          top: 80px;
        }
      }
    }
    .open {
      position: absolute;
      width: 300px;
      height: 300px;
      left: 0;
      top: 0;
      background-color: transparent;
      z-index: 6;
      cursor: pointer;
    }
  }
}
</style>
