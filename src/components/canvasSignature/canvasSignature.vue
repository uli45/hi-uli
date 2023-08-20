<script setup lang="ts">
import { ref, onMounted } from 'vue'
import md from './index.md?raw'
import textLine from '../transitionComp/line.vue'
import { ElMessage } from 'element-plus'
const canvasRef = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

const isDown = ref(false)

// 这次要用数组来记录
const points = ref<{ x: number; y: number }[]>([]) // 这是一个笔画的点
const allPoints = ref<
  {
    x: number
    y: number
  }[][]
>([]) // 这是所有笔画的点
onMounted(() => {
  initCanvas()
  canvasRefListenerDown()
  canvasRefListenerMove()
  canvasRefListenerUp()
})
const initCanvas = () => {
  // const res = canvasRef.value!.getContext('2d', { willReadFrequentLy: true })
  // if (!res || !(res instanceof CanvasRenderingContext2D)) {
  //   throw new Error('Failed to get 2D context')
  // }
  // const ctx: CanvasRenderingContext2D = res
  ctx.value = canvasRef.value!.getContext('2d') as unknown as CanvasRenderingContext2D
  ctx.value!.lineWidth = 3
  ctx.value!.strokeStyle = '#000'
}
const draw = (startX: number, startY: number, endX: number, endY: number) => {
  ctx.value?.moveTo(startX, startY)
  ctx.value?.lineTo(endX, endY)
  ctx.value?.stroke()
}
//监听鼠标按下
const canvasRefListenerDown = () => {
  canvasRef.value!.addEventListener(
    'mousedown',
    ({ x, y }) => {
      isDown.value = true
      //x y 起点
      let X = x - canvasRef.value!.getBoundingClientRect().left
      let Y = y - canvasRef.value!.getBoundingClientRect().top
      points.value.push({ x: X, y: Y })
      ctx.value?.beginPath()
    },
    false
  )
}
// 监听鼠标移动
const canvasRefListenerMove = () => {
  canvasRef.value!.addEventListener(
    'mousemove',
    ({ x, y }) => {
      if (!isDown.value) return
      let X = x - canvasRef.value!.getBoundingClientRect().left
      let Y = y - canvasRef.value!.getBoundingClientRect().top
      const lastPoint = points.value.at(-1)
      draw(lastPoint!.x, lastPoint!.y, X, Y)
      points.value.push({ x: X, y: Y })
    },
    false
  )
}
//监听鼠标抬起
const canvasRefListenerUp = () => {
  canvasRef.value!.addEventListener(
    'mouseup',
    () => {
      isDown.value = false
      ctx.value?.closePath()
      allPoints.value.push(points.value)
      points.value = []
    },
    false
  )
}
//保存canvas 为图片
const saveCanvas = () => {
  if (!allPoints.value.length)
    return ElMessage({
      message: '请先绘制签名',
      type: 'error'
    })
  const link = document.createElement('a')
  document.body.append(link)
  link.href = canvasRef.value!.toDataURL('image/png')
  link.download = 'picture.png'
  link.click()
  //移除元素
  document.body.removeChild(link)
  ElMessage({
    message: '签名保存成功',
    type: 'success'
  })
}
// 清空画布
const resetPath = () => {
  ctx.value?.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
}
//返回上一步
const backNext = () => {
  // canvas本身不会记录用户的每一步操作
  // 要回到上一步，只能一次性清空所有的
  resetPath()
  allPoints.value.pop()
  allPoints.value.forEach((e) => {
    e.forEach((item, index) => {
      let next = e[index + 1]
      if (next) {
        ctx.value?.beginPath()
        draw(item.x, item.y, next.x, next.y)
        ctx.value?.closePath()
      }
    })
  })
}
// 重写
const resetCanvas = () => {
  resetPath()
  allPoints.value = []
}
</script>

<template>
  <div class="my-demo canvas-sign">
    <div class="title">
      <span>一个简单的canvas手写签名</span>
      <textLine :md="md"></textLine>
    </div>
    <canvas
      ref="canvasRef"
      id="canvas"
      width="800"
      height="400"
      style="background: rgba(255, 255, 255, 0.6)"
    ></canvas>
    <div class="btn">
      <el-button @click="saveCanvas">保存</el-button>
      <el-button @click="resetCanvas">重写</el-button>
      <el-button @click="backNext">上一步</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.canvas-sign {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding-top: 0px;
  .title {
    font-size: 18px;
    font-weight: 500;
    height: 30px;
    display: flex;

    span {
      margin-right: 20px;
    }
  }
  #canvas {
    margin: 60px auto 40px;
    display: block;
    // background-color: #000 !important;
  }
  .btn {
    margin: 0 auto;
    width: 50%;
    // background-color: #fff;
  }
}
</style>
