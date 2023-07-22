<script setup lang="ts">
import { onMounted, ref } from 'vue'

/**
 * @typedef {Object} Props
 * @property {Number} dotNum - 小球的数量 不传默认36
 * @property {Number} dotParentSize - 小球环绕的宽度，不传默认150 容器尺寸
 * @property {Number} ballSize - 小球的尺寸，不传默认10
 * @property {Number} loadingTime - 小球旋转的时间，不传默认2
 * @property {Number} dotDelay - 小球旋转的延迟，不传默认6s
 * @property {String} beforeColor - 小球 ::before元素的颜色.
 * @property {String} afterColor - 小球 ::after元素的颜色.
 * @type {Props}
 */
const props = defineProps({
  dotNum: {
    type: Number,
    default: 36
  },

  dotParentSize: {
    type: Number,
    default: 150
  },
  ballSize: {
    type: Number,
    default: 10
  },
  loadingTime: {
    type: Number,
    default: 2
  },
  dotDelay: {
    type: Number,
    default: 6
  },
  beforeColor: {
    type: String,
    default: 'pink'
  },
  afterColor: {
    type: String,
    default: '#000'
  }
})

const pDeg = 360 / props.dotNum
const domRef = ref<any>(null)
//获取所有的dot

onMounted(() => {
  if (domRef.value) {
    let children = domRef.value.children
    for (let i = 0; i < children.length; i++) {
      // 在这里添加其他需要的样式
      //   children[i].style.backgroundColor = 'red'
      children[i].style.rotate = pDeg * i + 'deg'
      children[i].style.transformOrigin =
        'center ' + (props.dotParentSize / 2 + props.ballSize / 2) + 'px'
    }
    console.log(children[1].style)
  }
})
</script>

<template>
  <div class="loadingBox">
    <div
      ref="domRef"
      class="loading"
      :data-num="props.dotNum"
      :style="{
        '--contSize': props.dotParentSize + 'px',
        '--ballSize': props.ballSize + 'px',
        '--loadingTime': props.loadingTime + 's',
        '--afterColor': props.afterColor,
        '--beforeColor': props.beforeColor
      }"
    >
      <div
        class="dot"
        v-for="i in props.dotNum"
        :key="i"
        :style="{
          '--dotAnimationDelay': `-${
            (props.loadingTime / props.dotNum) * (i - 1) * props.dotDelay
          }s`
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$ballSize: var(--ballSize);
$contSize: var(--contSize);
$num: var(--num);
$pDeg: 360deg / $num; //每个小球的角度
// @import './loading.scss';
$t: 36;

.loadingBox {
  // background-color: #59d3f9;
  // padding: 20px;

  .loading {
    width: $contSize;
    height: $contSize;
    margin: auto;
    position: relative;
    border-radius: 50%;
    // outline: 1px solid #fff;

    .dot {
      position: absolute;
      left: 50%;
      top: 0;
      width: $ballSize;
      height: $ballSize;
      margin-left: calc($ballSize/2 * -1);
      margin-top: calc($ballSize/2 * -1);
      perspective: 70px;
      transform-style: preserve-3d;
      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      &::before {
        background-color: var(--beforeColor);
        top: -100%;
        animation: dotFrames var(--loadingTime) infinite;
        animation-delay: var(--dotAnimationDelay);
        @keyframes dotFrames {
          0% {
            animation-timing-function: ease-in;
          }
          25% {
            transform: translate3d(0, 100%, $ballSize);
            animation-timing-function: ease-out;
          }
          50% {
            transform: translate3d(0, 200%, 0);
            animation-timing-function: ease-in;
          }
          75% {
            transform: translate3d(0, 200%, $ballSize);
            animation-timing-function: ease-out;
          }
        }
      }
      &::after {
        background-color: var(--afterColor);
        top: 100%;
        animation: dotFrames-black var(--loadingTime) infinite;
        animation-delay: var(--dotAnimationDelay);
        @keyframes dotFrames-black {
          0% {
            animation-timing-function: ease-in;
          }
          25% {
            transform: translate3d(0, -100%, $ballSize);
            animation-timing-function: ease-out;
          }
          50% {
            transform: translate3d(0, -200%, 0);
            animation-timing-function: ease-in;
          }
          75% {
            transform: translate3d(0, -100%, $ballSize);
            animation-timing-function: ease-out;
          }
        }
      }
    }
  }
}
</style>
