<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
// import { musicStore } from '@/stores'
// import { storeToRefs } from 'pinia'
type musicList = {
  id: number
  name: string
  picUrl: string
  alg: string
  canDislike: boolean
  copywriter?: string | null | undefined | number
  type: number | string
  trackNumberUpdateTime?: string | null | undefined | number
  song: any
}
const baseUrl = 'https://autumnfish.cn'
const recommendMusic = ref<musicList[]>([])
const src = ref('')
const audioRef = ref<HTMLAudioElement>()
const songName = ref('情非得已 (童声版)')
const songStartMin = ref('00')
const songStartSec = ref('00')
const songEndTime = ref('03:17')
const isPlay = ref(false)
const index = ref(0)
const limit = ref(2)
const totalTime = ref(0)
const barWidth = ref(0)
//发送请求
const fetchData = async (url: string) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    recommendMusic.value = removeArr([...new Set(recommendMusic.value?.concat(data.result))])
  } catch (error) {
    console.log(error)
  }
}
const removeArr = (arr: musicList[]) => {
  const res = new Map()
  return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
}
const turnTime = (time: string) => {
  const S = +time / 1000
  const min = Math.floor(S / 60)
  const sec = Math.floor(S % 60)
  return `${String(min).length > 1 ? min : '0' + min}:${String(sec).length > 1 ? sec : '0' + sec}`
}
const fetchDataUrl = async (url: string) => {
  try {
    const res = await fetch(url)
    const data = await res.json()
    src.value = data.data[0].url
    songEndTime.value = turnTime(data.data[0].time)
    totalTime.value = +data.data[0].time / 1000
  } catch (error) {
    console.log(error)
  }
}
const playMusic = () => {
  audioRef.value!.play()

  isPlay.value = true
}
const pauseMusic = () => {
  audioRef.value!.pause()

  isPlay.value = false
}
const nextSong = useDebounceFn(async () => {
  // 创建一个点击保存的变量用于切换下一曲和查找id 再获取url 在播放
  if (index.value === recommendMusic.value!.length - 1) {
    limit.value += 2
    await fetchData(baseUrl + `/personalized/newsong?limit=${limit.value}`)
  }
  const songObj = recommendMusic.value![index.value]
  index.value += 1
  songName.value = songObj.name

  fetchDataUrl(baseUrl + `/song/url?id=${songObj.id}`)
}, 500)
onMounted(async () => {
  await fetchData(baseUrl + `/personalized/newsong?limit=${limit.value}`)
  // await fetchDataUrl(baseUrl + `/song/url?id=${recommendMusic.value![0].id}`)
  await fetchDataUrl(baseUrl + `/song/url?id=${33894312}`)
  changeTime()
})
const changeTime = () => {
  audioRef.value!.ontimeupdate = () => {
    songStartSec.value =
      String(Math.floor(audioRef.value!.currentTime % 60)).length > 1
        ? String(Math.floor(audioRef.value!.currentTime % 60))
        : '0' + String(Math.floor(audioRef.value!.currentTime % 60))
    songStartMin.value =
      String(Math.floor(audioRef.value!.currentTime / 60)).length > 1
        ? String(Math.floor(audioRef.value!.currentTime / 60))
        : '0' + String(Math.floor(audioRef.value!.currentTime / 60))
    barWidth.value = (audioRef.value!.currentTime / totalTime.value) * 100
  }
}
const onPlay = () => {
  isPlay.value = true
}
</script>

<template>
  <div class="my-audio">
    <div class="box">
      <div class="player">
        <el-icon class="img" :size="30" @click="playMusic" v-show="!isPlay">
          <svg
            t="1692452358532"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5389"
            width="48"
            height="48"
          >
            <path
              d="M772.7 217.7a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"
              fill="currentColor"
              p-id="5390"
            ></path>
            <path
              d="M415.8 679.9c5.9 0 11.5-1.6 16.2-4.5l231.1-134.6c10.9-5.2 18.5-16.3 18.5-29.2 0-11.9-6.4-22.3-16-27.8L439.7 352.2c-5.8-6.7-14.4-10.9-23.9-10.9-17.6 0-31.8 14.4-31.8 32.1 0 0.6 0 1.2 0.1 1.8l-0.4 0.2 0.5 269c-0.1 1.1-0.2 2.2-0.2 3.4 0 17.7 14.3 32.1 31.8 32.1z"
              fill="currentColor"
              p-id="5391"
            ></path>
            <path
              d="M909.8 306.6c-5.4-10.5-16.3-17.8-28.9-17.8-17.8 0-32.2 14.4-32.2 32.1 0 6 1.7 11.7 4.6 16.5l-0.1 0.1c26.9 52.4 42.1 111.8 42.1 174.7 0 211.6-171.6 383.2-383.2 383.2S128.8 723.8 128.8 512.2 300.4 129.1 512 129.1c62.5 0 121.5 15 173.6 41.5l0.2-0.4c4.6 2.6 10 4.1 15.7 4.1 17.8 0 32.2-14.4 32.2-32.1 0-13.1-7.9-24.4-19.3-29.4C653.6 81.9 584.9 64.5 512 64.5 264.7 64.5 64.3 265 64.3 512.2S264.7 959.9 512 959.9s447.7-200.4 447.7-447.7c0-74.1-18-144-49.9-205.6z"
              fill="currentColor"
              p-id="5392"
            ></path>
          </svg>
        </el-icon>
        <el-icon class="img" :size="30" @click="pauseMusic" v-show="isPlay">
          <svg
            t="1692457087810"
            class="icon"
            viewBox="0 0 1048 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6550"
            width="48"
            height="48"
          >
            <path
              d="M524.272128 0.018022C241.513165 0.018022 12.288102 229.245952 12.288102 512.005018c0 112.734003 36.43904 216.957952 98.17897 301.537997l38.667981-40.258048C97.458176 699.230003 67.143168 609.158963 67.143168 512.005018 67.143168 259.540992 271.807078 54.872986 524.272128 54.872986c252.45696 0 457.120973 204.668006 457.120973 457.132032 0 252.460954-204.664013 457.118003-457.120973 457.118003-96.240026 0-185.530982-29.744026-259.189043-80.53504l-34.539008 42.797978c83.150029 58.344038 184.437965 92.596019 293.728973 92.596019 282.758963 0 511.984026-229.220966 511.984026-511.976038C1036.256154 229.245952 807.031091 0.018022 524.272128 0.018022zM615.693107 256.011981l0 511.987 54.855 0L670.548107 256.012 615.693128 256.012zM377.996083 256.011981l0 511.987 54.855 0L432.851083 256.012 377.996128 256.012z"
              p-id="6551"
              fill="currentColor"
            ></path>
          </svg>
        </el-icon>
      </div>
      <div class="player">
        <el-icon class="img" :size="30" @click="nextSong">
          <svg
            t="1692451135957"
            class="img"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4075"
            width="48"
            height="48"
          >
            <path
              class="my-path"
              d="M496.457514 918.259724c-246.323105 0-446.716134-200.392006-446.716134-446.702831 0-246.323105 200.39303-446.716134 446.716134-446.716134 246.309802 0 446.701808 200.39303 446.701808 446.716134C943.160345 717.867718 742.768339 918.259724 496.457514 918.259724zM496.457514 79.850629c-215.984123 0-391.706263 175.721117-391.706263 391.706263 0 215.985146 175.721117 391.691937 391.706263 391.691937S888.150474 687.542038 888.150474 471.556892C888.150474 255.57277 712.44266 79.850629 496.457514 79.850629z"
              fill="currentColor"
              p-id="4076"
            ></path>
            <path
              d="M828.560284 485.310128c-7.602142 0-13.752212-6.151094-13.752212-13.752212 0-143.125745-96.30744-269.409916-234.195903-307.108516-7.318686-2.001587-11.644201-9.562796-9.643638-16.894785 2.001587-7.333012 9.643638-11.56336 16.895809-9.642614 149.814074 40.961924 254.449179 178.151469 254.449179 333.646939C842.313519 479.159034 836.162426 485.310128 828.560284 485.310128z"
              fill="currentColor"
              p-id="4077"
            ></path>
            <path
              d="M515.004939 153.703661c-0.254803 0-0.51063 0-0.765433-0.026606-5.89629-0.322341-11.819187-0.483001-17.781992-0.483001-7.587815 0-13.752212-6.151094-13.752212-13.752212s6.164397-13.752212 13.752212-13.752212c6.460132 0 12.893658 0.188288 19.286252 0.537236 7.587815 0.403183 13.403265 6.889921 12.986779 14.477736C528.327362 148.023288 522.25711 153.703661 515.004939 153.703661z"
              fill="currentColor"
              p-id="4078"
            ></path>
            <path
              d="M568.068482 597.062328c-20.992103 0-32.072463-15.512299-32.072463-36.086893L535.996019 382.125047c0-20.561291 11.43033-36.07359 32.877805-36.07359 7.789407 0 13.189394 2.109034 20.063965 6.083555l143.676283 89.633437c12.893658 7.453762 19.891026 18.815531 19.891026 30.957059-0.014326 11.416004-7.17133 21.931498-19.151176 28.821419l-145.019885 89.284489C581.174987 594.954317 575.722812 597.062328 568.068482 597.062328zM568.873824 373.556904c-2.37714 0-5.372358 0.618077-5.372358 8.568143l0 178.850387c0 7.735172 1.772366 8.582469 4.567016 8.582469 2.834558 0 3.41068-0.832971 6.123464-2.40477l146.066727-89.284489c3.988848-2.296299 4.740978-4.324492 4.740978-5.157463 0-1.249457-2.228761-4.351098-7.399527-7.333012l-142.628418-89.633437C572.606845 374.389876 571.828109 373.556904 568.873824 373.556904z"
              fill="currentColor"
              p-id="4079"
            ></path>
            <path
              d="M358.636588 597.062328c-19.527752 0-28.928866-15.176654-28.928866-36.086893L329.707722 382.125047c0-20.911262 9.549493-36.07359 29.277814-36.07359 7.184633 0 12.255115 2.109034 19.145036 6.083555l141.507898 89.687672c12.435217 7.184633 19.21769 18.305925 19.205411 30.258141 0 11.643178-7.359618 22.37459-19.662829 29.465079l-140.943033 89.190345C370.932636 594.954317 365.754706 597.062328 358.636588 597.062328zM358.986559 373.556904c-4.337795 0-1.772366 2.874467-1.772366 8.568143l0 178.850387c0 8.582469-0.107447 8.582469 1.423419 8.582469 1.598404 0 1.860371-0.416486 5.311982-2.40477l141.991921-89.190345c4.511757-2.618641 5.412266-4.91494 5.412266-5.895267 0-1.181919-2.042519-3.935636-6.809079-6.688329l-140.460032-89.687672C361.799628 374.389876 361.350396 373.556904 358.986559 373.556904z"
              fill="currentColor"
              p-id="4080"
            ></path>
          </svg>
        </el-icon>
      </div>
      <div class="right">
        <div class="top">
          <div class="text">{{ songName }}</div>
          <div class="time">
            <span class="start">{{ songStartMin }}:{{ songStartSec }}</span>
            <span class="xie">/</span>
            <span class="end">{{ songEndTime }}</span>
          </div>
        </div>
        <div class="barBox">
          <div class="progressCurrent" :style="{ width: barWidth + '%' }"></div>
        </div>
      </div>

      <audio class="audio" ref="audioRef" @play="onPlay" :src="src" loop></audio>
    </div>
  </div>
</template>

<style scoped lang="less">
.my-audio {
  height: 100%;
  width: 400px;
  > .box {
    // background-color: #fff;
    background-color: rgba(255, 255, 255, 0.5);
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    overflow: hidden;
    border-radius: 50px;
    padding: 0 20px;
    .player {
      width: 30px;
      height: 30px;
      position: relative;
      margin-right: 6px;
      overflow: hidden;
      > .img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        color: #1296db;
        &:active {
          color: #055d8d;
        }
      }
    }
    > .right {
      // background-color: pink;
      width: 100%;
      height: 100%;
      padding-top: 5px;
      > .top {
        // background-color: gold;

        height: 26px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        > .text {
          height: 20px;
          line-height: 20px;
          overflow: hidden;
        }
        > .time {
          color: rgba(0, 0, 0, 0.8);
          > .xie {
            margin: 0 4px;
          }
        }
      }

      > .barBox {
        background-color: rgba(255, 255, 255, 0.4);
        height: 2px;
        width: 100%;
        border-radius: 2px;
        overflow: hidden;
        > .progressCurrent {
          background-color: rgba(0, 0, 0, 0.4);
          height: 2px;
          // width: 10%;
        }
      }
    }
    .audio {
      display: none;
    }
  }
}
</style>
