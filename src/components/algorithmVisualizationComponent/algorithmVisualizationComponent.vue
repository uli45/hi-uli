<script setup lang="ts">
import { ref, onMounted } from 'vue'
import textLine from '../transitionComp/line.vue'
import md from './index.md?raw'
import { ElMessage } from 'element-plus'
//生成乱序数组
const numList = ref<Number[]>([])
for (let i = 0; i < 4; i++) {
  // 生成一个 0 - 179的有序数组
  const arr = [...Array(180).keys()] // Array.keys()可以学一下，很有用
  const res = []
  while (arr.length) {
    // 打乱
    const randomIndex = Math.random() * arr.length - 1
    res.push(arr.splice(randomIndex, 1)[0])
  }
  numList.value = [...numList.value, ...res]
}
//
const canvas: any = ref(null)
const ctx: any = ref(null)
const start = ref(false)
const sortName = ref('')
onMounted(() => {
  initCanvas()
  drawAll(numList.value)
})
const initCanvas = () => {
  ctx.value = canvas.value.getContext('2d', { willReadFrequentLy: true })
  const canvasStyle = window.getComputedStyle(canvas.value)
  const width = canvasStyle.getPropertyValue('width')
  const height = canvasStyle.getPropertyValue('height')
  ctx.value.fillStyle = 'white' // 设置画画的颜色
  ctx.value.translate(parseInt(width) / 2, parseInt(height) / 2) //
  ctx.value.beginPath() // 开始画
  // ctx.value.lineWidth = 2 // 设置画笔宽度
  ctx.value.fillRect(31, 0, 5, 3) // 画一个矩形
  ctx.value.closePath()
}
//计算角度
const CosAndSin = ref<{ cos: Number; sin: Number }[]>([])
for (let i = 0; i < 360; i++) {
  const angle = (i / 180) * Math.PI
  CosAndSin.value.push({ cos: Math.cos(angle), sin: Math.sin(angle) })
}
// 单个长方形构造函数

function RectFn(newX: number, newY: number, newWidth: number, newHeight: number) {
  let x = ref(0)
  let y = ref(0)
  let width = ref(0)
  let height = ref(0)
  x.value = newX // 坐标x
  y.value = newY // 坐标y
  width.value = newWidth // 长方形的宽
  height.value = newHeight // 长方形的高
  return { x, y, width, height }
}
const draw = (x: number, y: number, width: number, height: number) => {
  ctx.value.beginPath()
  ctx.value.fillRect(x, y, width, height)
  ctx.value.closePath()
}

const drawAll = (arr: Number[]) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      ctx.value.clearRect(-500, -500, 1000, 1000) // 清空画布
      const rects = [] // 用来存储720个长方形
      for (let i = 0; i < arr.length; i++) {
        const num = arr[i]
        const { cos, sin } = CosAndSin.value[Math.floor(i / 2)] // 一个角画两个
        const x = Number(num) * Number(cos) // x = ρ * cosθ
        const y = Number(num) * Number(sin) // y = ρ * sinθ
        rects.push(RectFn(x, y, 5, 3)) // 收集所有长方形
      }
      rects.forEach((rect) => draw(rect.x.value, rect.y.value, rect.width.value, rect.height.value)) // 遍历渲染
      resolve('draw success')
    }, 10)
  })
}
//清空
const clearRect = (data: Number[]) => {
  ctx.value.clearRect(-500, -500, 1000, 1000) // 清空画布
  drawAll(data)
}
const seconds = ref(0)
const milliseconds = ref(0)
let timer: any = ref()
const updateTimer = (bool: boolean, startTime: any, Name: string) => {
  if (!bool) {
    clearInterval(timer.value)
    return
  }
  sortName.value = Name
  startTime = Date.now()
  timer.value = setInterval(() => {
    let elapsedTime = Date.now() - startTime
    seconds.value = Math.floor(elapsedTime / 1000)
    milliseconds.value = elapsedTime / 1000
  }, 1)
}
//冒泡排序
const bubbleSort = async (data: Number[]) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  const arr = JSON.parse(JSON.stringify(data))
  clearRect(arr)
  let len = arr.length
  start.value = true
  updateTimer(true, new Date(), '选择排序')

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //相邻元素两两对比
        let temp = arr[j + 1] //元素交换
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
    }
    await drawAll(arr) // 一边排序一边重新画
    if (len - 1 === i) {
      start.value = false
      updateTimer(false, new Date(), '冒泡排序')
    }
  }
  return arr
}
// 选择排序
const selectionSort = async (data: Number[]) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  const arr = JSON.parse(JSON.stringify(data))
  clearRect(arr)
  start.value = true
  updateTimer(true, new Date(), '插入排序')
  let len = arr.length
  let minIndex, temp
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        //寻找最小的数
        minIndex = j //将最小数的索引保存
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
    await drawAll(arr)
    if (len - 1 === i) {
      start.value = false
      updateTimer(false, new Date(), '选择排序')
    }
  }
  return arr
}
// 插入排序
const insertionSort = async (data: Number[]) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  const arr = JSON.parse(JSON.stringify(data))
  updateTimer(true, new Date(), '插入排序')
  clearRect(arr)
  start.value = true
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array') {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i]
      let j = i - 1
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = key
      await drawAll(arr)
    }
    start.value = false
    updateTimer(false, new Date(), '插入排序')
    return arr
  } else {
    return 'arr is not an Array!'
  }
}
//堆排序
const heapSort = async (data: Number[]) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  start.value = true
  updateTimer(true, new Date(), '堆排序')
  const array = JSON.parse(JSON.stringify(data))
  if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {
    //建堆
    let heapSize = array.length,
      temp
    for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
      heapify(array, i, heapSize)
      await drawAll(array)
    }

    //堆排序
    for (let j = heapSize - 1; j >= 1; j--) {
      temp = array[0]
      array[0] = array[j]
      array[j] = temp
      heapify(array, 0, --heapSize)
      await drawAll(array)
    }

    start.value = false
    updateTimer(false, new Date(), '堆排序')
    return array
  } else {
    return 'array is not an Array!'
  }
}
const heapify = (arr: Number[], x: number, len: number) => {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
    let l = 2 * x + 1,
      r = 2 * x + 2,
      largest = x,
      temp
    if (l < len && arr[l] > arr[largest]) {
      largest = l
    }
    if (r < len && arr[r] > arr[largest]) {
      largest = r
    }
    if (largest != x) {
      temp = arr[x]
      arr[x] = arr[largest]
      arr[largest] = temp
      heapify(arr, largest, len)
    }
  } else {
    return 'arr is not an Array or x is not a number!'
  }
}
//基数排序
const radixSort = async (data: Number[], maxDigit: number) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  start.value = true
  updateTimer(true, new Date(), '基数排序')
  const arr = JSON.parse(JSON.stringify(data))
  let mod = 10
  let dev = 1
  let counter = [] as any[]
  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (let j = 0; j < arr.length; j++) {
      let bucket = (arr[j] % mod) / dev
      if (counter[bucket] == null) {
        counter[bucket] = []
      }
      counter[bucket].push(arr[j])
    }
    let pos = 0
    for (let j = 0; j < counter.length; j++) {
      let value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
          await drawAll(arr)
        }
      }
    }
  }
  start.value = false
  updateTimer(false, new Date(), '基数排序')
  return arr
}
const shellSort = async (data: Number[]) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  start.value = true
  updateTimer(true, new Date(), '希尔排序')
  const arr = JSON.parse(JSON.stringify(data))
  let len = arr.length,
    temp,
    gap = 1
  while (gap < len / 5) {
    //动态定义间隔序列
    gap = gap * 5 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 5)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
      await drawAll(arr)
    }
  }

  start.value = false
  updateTimer(false, new Date(), '希尔排序')

  return arr
}
const countingSort = async (data: any) => {
  if (start.value) return ElMessage.error('已经开始排序，请等待排序完成后再开始')
  start.value = true
  updateTimer(true, new Date(), '计数排序')
  const arr = JSON.parse(JSON.stringify(data))
  if (arr.length <= 1) {
    return arr
  }

  // 确定数组的范围
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const range = max - min + 1

  // 创建计数数组，并初始化为0
  const countArray = new Array(range).fill(0)

  // 统计每个元素出现的次数
  for (let i = 0; i < arr.length; i++) {
    const countIndex = arr[i] - min
    countArray[countIndex]++
  }

  // 根据计数数组重新排序原数组
  let sortedIndex = 0
  for (let i = 0; i < countArray.length; i++) {
    while (countArray[i] > 0) {
      arr[sortedIndex] = i + min
      sortedIndex++
      countArray[i]--
      await drawAll(arr)
    }
  }
  start.value = false
  updateTimer(false, new Date(), '计数排序')

  return arr
}
</script>

<template>
  <div class="algorithmVisualizationComponent">
    <div class="text">
      <textLine :md="md" />
    </div>
    <div>{{ sortName }}排序耗时：{{ seconds }} S : {{ milliseconds }} ms</div>
    <div class="btnBox">
      <el-button type="primary" @click="bubbleSort(numList)">冒泡排序</el-button>
      <el-button type="primary" @click="selectionSort(numList)">选择排序</el-button>
      <el-button type="primary" @click="insertionSort(numList)">插入排序</el-button>
      <el-button type="primary" @click="heapSort(numList)">堆排序</el-button>
      <el-button type="primary" @click="radixSort(numList, 3)">基数排序</el-button>
      <el-button type="primary" @click="shellSort(numList)">希尔排序</el-button>
      <el-button type="primary" @click="countingSort(numList)">计数排序</el-button>
    </div>
    <canvas id="canvas" ref="canvas" width="1600" height="600" style="background: #000"></canvas>
  </div>
</template>

<style scoped lang="scss">
.algorithmVisualizationComponent {
  .text {
    width: 4em;
    // height: 100px;
  }
  #canvas {
    margin-top: 6px;
    width: calc(100vw - 340px);
    height: calc(100vh - 200px);
  }
}
</style>
