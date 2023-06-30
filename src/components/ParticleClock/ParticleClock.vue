<script setup lang="ts">
import { onMounted, ref } from 'vue'
//获取 canvas
const canvas: any = ref(null)
const ctx: any = ref(null)
const x = ref(0)
const y = ref(0)
const size = ref(0)
let ParticleClockList: any = ref([])
const snowTimeout: any = ref(null)

//初始化canvas宽高
const initCanvasSize = () => {
  // canvas.width = window.innerWidth * devicePixelRatio
  canvas.value.width = window.innerWidth * devicePixelRatio
  // canvas.height = window.innerHeight * devicePixelRatio
  canvas!.value.height = window.innerHeight * devicePixelRatio
}

//得到范围内的随机数
const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

// 构造颗粒函数
class ParticleClock {
  constructor() {
    //半径
    const r = Math.min(canvas.value.width, canvas.value.height) / 2
    const cx = canvas.value.width / 2
    const cy = canvas.value.height / 2
    const rad = (getRandom(0, 360) * Math.PI) / 180
    x.value = cx + r * Math.cos(rad)
    y.value = cy + r * Math.sin(rad)
    //粒子大小      devicePixelRatio 解决清晰度问题
    size.value = getRandom(10 * devicePixelRatio, 30 * devicePixelRatio)
  }
  //绘画
  draw() {
    ctx.value.beginPath()
    ctx.value.fillStyle = '#5445544d'
    ctx.value.arc(x.value, y.value, size.value, 0, Math.PI * 2)
    ctx.value.fill()
  }
  moveTo(tx: number, ty: number) {
    const duration = 500 //动画持续时间
    const sx = x.value
    const sy = y.value
    const xSpeed = (tx - sx) / duration
    const ySpeed = (ty - sy) / duration
    const startTime = Date.now()
    function _move() {
      const t = Date.now() - startTime
      const myx = sx + xSpeed * t
      const myy = sy + ySpeed * t
      x.value = myx
      y.value = myy
      if (t < duration) {
        x.value = tx
        y.value = ty
        return
      }
      // window.requestAnimationFrame( _move)
      snowTimeout.value = requestAnimationFrame(function () {
        _move
      })
    }
    _move()
  }
}
//创建点
//  const ParticleClock= ()=>{
//       // let obj = {
//         //半径
//         const r = Math.min(canvas.value.width, canvas.value.height) / 2
//         const cx = canvas.value.width / 2
//         const cy = canvas.value.height / 2
//         const rad = getRandom(0, 360) * Math.PI / 180
//         x.value = cx + r * Math.cos(rad)
//         y.value = cy + r * Math.sin(rad)
//         //粒子大小      devicePixelRatio 解决清晰度问题
//         size.value = getRandom(10 * devicePixelRatio, 30 * devicePixelRatio)

//         ctx.value.beginPath()
//         ctx.value.fillStyle = '#5445544d'
//         ctx.value.arc(x.value, y.value, size.value, 0, Math.PI * 2)
//         ctx.value.fill()
//       // }
//       // return obj
// }
const draw = () => {
  // ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ParticleClockList.value.forEach((p: any) => p.draw())
  window.requestAnimationFrame(draw)
}
onMounted(() => {
  //canvas.value = document.getElementById('myCanvas') as HTMLCanvasElement // 使用类型断言将其转换为 HTMLCanvasElement 类型
  //得到 canvas 上下文对象
  // ctx.value = canvas.value.getContext('2d', { willReadFrequentLy: true })
  // initCanvasSize()
  // ParticleClock()
  // const P =new ParticleClock()
  // P.draw()
  // for (let i = 0; i < 1000; i++) {
  // ParticleClockList.value.push( new ParticleClock())
  // const P = new ParticleClock()
  // P.draw()
  // P.moveTo(100, 100)
  // ParticleClockList.value.push(P)
  // }

  // setTimeout(()=>{
  // draw()
  // },500)
})
</script>

<template>
  <div class="ParticleClock">
    <div class="">粒子时钟效果</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped lang="less">
.ParticleClock {
  canvas {
    background: radial-gradient(#fff, #8c738c);
    display: block;
    width: 100%;
    height: calc(100vh - 160px);
  }
}
</style>
