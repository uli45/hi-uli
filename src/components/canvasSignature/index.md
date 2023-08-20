## 一个简单的canvas 手写签名 
###  只是适配了pc端，移动端需要自己适配 适配也简单，就是把mouse事件换成touch事件
### 代码如下
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { useMousePressed, useMouse } from '@vueuse/core'

const canvasRef = ref<HTMLCanvasElement>()
// const canvas = canvasRef.value
const ctx = ref<CanvasRenderingContext2D>()
// const { pressed } = useMousePressed({ target: canvasRef.value, touch: false })
// const { x, y } = useMouse({ target: canvasRef.value, touch: false })
const isDown = ref(false)
// const lastY = ref(0)
// const lastX = ref(0)
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
    ({ x, y, pageX, pageY }) => {
      console.log(pageX, pageY)
      isDown.value = true
      console.log(x, y) //x y 起点
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
      console.log(allPoints.value, points.value)
    },
    false
  )
}
//保存canvas 为图片
const saveCanvas = () => {
  const link = document.createElement('a')
  document.body.append(link)
  link.href = canvasRef.value!.toDataURL('image/png')
  link.download = 'picture.png'
  link.click()
  //移除元素
  document.body.removeChild(link)
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
    <canvas
      ref="canvasRef"
      id="canvas"
      width="600"
      height="600"
      style="background: rgba(255, 255, 255, 0.6)"
    ></canvas>
    <el-button @click="saveCanvas">保存</el-button>

    <el-button @click="resetCanvas">重写</el-button>
    <el-button @click="backNext">上一步</el-button>
  </div>
</template>

<style scoped lang="less">
.canvas-sign {
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding-top: 100px;
  #canvas {
    margin: 0 auto;
    display: block;
    // background-color: #000 !important;
  }
}
</style>

```