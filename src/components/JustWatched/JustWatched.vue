<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { useIntersectionObserver, useScroll } from '@vueuse/core'
import md from './index.md?raw'
import textLine from '../transitionComp/line.vue'
interface Data {
  loaded: boolean
  id: number | string
  url?: string
}
/**
 * 防抖函数接收的回调参数类型
 */
type CallbackFn = (item?: any) => void

//假如当前的id
const id = ref(100)
/**
 * 模拟获取当前视频之前有多少条视频
 * @param id 当前数据的id  模拟数据传递数字就行
 **/
const getOffSet = (id: number) => {
  if (id >= 0) {
    return id - 1
  } else {
    return id
  }
}

const getVideos = (page: number, size: number) => {
  const data = ref<Data[]>([])
  for (let i = 0; i < size; i++) {
    data.value.push({
      loaded: false,
      id: Math.floor(Math.random() * (100000 - 1 + 1)) + 1,
      url: `https://picsum.photos/1920/1080?r=${id.value++}`
    })
  }
  return data
}
/**
 * 获取索引范围。
 * @param page - 页码。
 * @param size - 条数。
 * @returns 返回的当前的索引范围最大最小值组成的数组。
 */
const getIndexRange = (page: any, size: number) => {
  const start = (page! - 1) * size
  const end = start + size - 1
  return [start, end]
}
/**
 * 根据传递的 下标 和每页条数获取当前页码。
 * @param index - 下标。
 * @param size - 每页条数。
 * @returns 返回的当前下标所在的页码。
 */
const getPage = (index: number, size: number) => {
  return Math.ceil((index + 1) / size)
}
/**
 * 防抖函数
 * @param Callback - 回调函数
 * @param delay - 延迟时间 默认300毫秒
 */
const debounce = (Callback: CallbackFn, delay: number = 300) => {
  let timer: any = null
  return function (...args: any) {
    timer != null ? clearTimeout(timer) : null
    timer = setTimeout(() => {
      Callback && Callback()
    }, delay)
  }
}

/**
 * 数据列表
 */
const data = ref<Data[]>([])

const target: any = ref(null)
const size = ref(8)

const createdData = (page: number, size: number) => {
  const count = page * size - data.value.length
  for (let i = 0; i < count; i++) {
    data.value.push({
      loaded: false,
      id: i
      // url:'https://www.baidu.com/link?url=w2DDYJDlfxgPr797Luw7YPcGuzaldFtrUvMe7F2VuAkZlgPgEMwYrbaag11S2CoLSM6StMG3PNm6rWGWAUzDwV_YaCPtxlR8MJLuSHWK18XhZ1Hs2kiXp-68Eyxp5tke3DSoO-tDc3B2kAnaUpreooH8VG_OHRTPfHi3sIqJxc0yeUnbK8BZhkeUFJSUN54owXBAkwfPBD0SNt2xArfuBpG704zb7rjoxxRUAtqDoOyiaCYNyfTRM1-68RMfMaW7r_45k5_95RTTuUzRFWJOhiqJ0Iy_ZGMTd_4xPyq1Pbb7Jz5IBhGF7zA-sVqxKAydMxuo0Hs0oQW8QhV1-kdANc36u3kheSYiJ5KXxD6T80LUfUGcF2f3tXjETm2KzANA-wGo5E4-UPweVnypV05eg6dUP1zKOLrNPwg57Vx_vjDfzzw_EaW5K-LXfMVxT5ERkn4KIGKakMsOIE2-1BxWwCIE2r0B0sDyoza1R13LzoEO7lYMWvY1KOPMmE1aZLnF-9hlGJAthuXWx2Xv57TH-I1YxH_GDR8ZX1X2Itxko1e0SNrxEVPZPHRQZByzSXoQ875b_p3WxlXE6gVCfoJ8NwlzsNtKNihFnJwmSxxfDRKa72u2reirg_9giG2-3S9lD2Y_NMx-rNy4wNO0DMhzl_&wd=&eqid=bb9e94550002d9b900000006649cabe8'
    })
  }
}

const visibleIndex = ref<number[]>([])

/**
 * 检测元素是否可见
 */
const ob = useIntersectionObserver(target, (entries: any) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const index = +entry.target.dataset.index

      visibleIndex.value.push(index)
    } else {
      const index = +entry.target.dataset.index
      visibleIndex.value = visibleIndex.value.filter((i) => i !== index)
    }
  }
  loadDataDebounce()
})
/**
 * 获取最小值最大值
 */
const getRange = () => {
  if (visibleIndex.value.length === 0) {
    return [0, 0]
  }
  const min = Math.min(...visibleIndex.value)
  const max = Math.max(...visibleIndex.value)
  return [min, max]
}
const loadData = () => {
  //获取当前看到的元素索引范围
  const [minIndex, maxIndex] = getRange()
  let pages: any = []
  for (let i = minIndex; i <= maxIndex; i++) {
    // console.log(i);
    if (!pages.includes(getPage(i, size.value))) {
      //   console.log('-----',getPage(i,size.value));
      pages.push(getPage(i, size.value))
    }
  }
  for (const page of pages) {
    const [minIndex, maxIndex] = getIndexRange(page, size.value)
    // console.log(minIndex,maxIndex)
    if (data.value[minIndex].loaded) {
      continue
    }
    data.value[minIndex].loaded = true
    // console.log(page);
    const res = getVideos(page, size.value)

    for (let i = minIndex; i <= maxIndex; i++) {
      data.value[i] = res.value[i - minIndex]
    }
  }
}
const showBtn = ref(false)
const JustWatchedPage = ref(0)
const JustWatchedIndex = ref(0)
/**
 * 条件判断 刚刚看过按钮是否需要显示或隐藏
 */
const setIndicatorViseble = () => {
  const offSet = getOffSet(id.value)
  const page = getPage(offSet, size.value)

  const [minIndex, maxIndex] = getRange()
  if (offSet >= minIndex && offSet <= maxIndex) {
    showBtn.value = false
  } else {
    showBtn.value = true
  }
  JustWatchedPage.value = page
  JustWatchedIndex.value = offSet
}
const toInedx: any = ref(null)

// const { x, y } = useScroll(target, { behavior: 'smooth' })
const toJustWatched = () => {
  console.log(JustWatchedPage.value)
  createdData(JustWatchedPage.value, size.value)
  watchEffect(() => {
    if (target.value[JustWatchedIndex.value]) {
      toInedx.value.scrollTo({
        top: target.value[JustWatchedIndex.value].offsetTop,
        behavior: 'smooth'
      })
    }
  })
}
const loadDataDebounce = debounce(loadData, 300)
onMounted(async () => {
  createdData(JustWatchedPage.value + 1, size.value)
  ob
  setTimeout(() => {
    setIndicatorViseble()
  }, 100)
})

const load = () => {
  createdData(JustWatchedPage.value++, size.value)
  return
}
</script>

<template>
  <div class="my-demo JustWatched">
    <div class="title">
      <span>实现抖音刚刚看过效果</span>
      <textLine :md="md"></textLine>
    </div>
    <div class="container" v-infinite-scroll="load" style="overflow: auto" ref="toInedx">
      <div
        class="item"
        :class="{ playing: index + 1 === id }"
        v-for="(item, index) in data"
        :key="index"
        :data-index="index"
        ref="target"
      >
        <img :src="item.url" alt="" />
        {{ index }}
      </div>
    </div>
    <div class="indicator" v-if="showBtn" @click="toJustWatched">刚刚看过</div>
  </div>
</template>

<style scoped lang="less">
.JustWatched {
  background-color: #373636;
  color: #fff;
  overflow: hidden;

  .title {
    font-size: 18px;
    font-weight: 500;
    height: 30px;
    display: flex;
    span {
      margin-right: 20px;
    }
  }

  .container {
    height: calc(100% - 50px);
    width: 100%;

    margin: 20px;
    display: flex;
    flex-wrap: wrap;

    .item {
      // float: left;

      width: 200px;
      height: 320px;
      border-radius: 5px;
      border: 1px solid #eee;
      overflow: hidden;
      margin-right: 6px;
      margin-bottom: 6px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .playing {
      position: relative;

      &::before {
        content: '刚刚观看过';
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        backdrop-filter: blur(2px);
      }
    }
  }

  .indicator {
    position: fixed;
    bottom: 20px;
    right: 30%;
    font-size: 12px;
    font-weight: 500;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ddd;
    color: #000;
    padding: 4px 10px;
  }
}
</style>
