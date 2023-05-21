<script setup lang="ts">
import { ref } from 'vue'
import ColorThief from 'colorthief'
import { ElMessage } from 'element-plus'
import type { imgs, img } from '@/types/compInfo'
const colorThief = new ColorThief()

const images = ref<imgs>([])
for (let i = 1; i <= 4; i++) {
  images.value.push({
    src: `https://picsum.photos/1920/1080?r=${i}`,
    alt: `这是随机获取的图片，当你看到这句话时该刷新页面了`
  })
}
const hoverIndex = ref(-1)
const html = document.documentElement
const handleMouseHover = async (img: any, index: number) => {
  try {
    hoverIndex.value = index
    const colors = await colorThief.getPalette(img, 3)
    const [c1, c2, c3] = colors.map((c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`)
    html.style.setProperty('--changeBackground1', c1)
    html.style.setProperty('--changeBackground2', c2)
    html.style.setProperty('--changeBackground3', c3)
  } catch (error) {
    ElMessage({
      message: '图片加载中！',
      type: 'warning'
    })
  }
}
const handleMouseLeave = () => {
  hoverIndex.value = -1
  html.style.setProperty('--changeBackground1', '#FFF')
  html.style.setProperty('--changeBackground2', '#FFF')
  html.style.setProperty('--changeBackground3', '#FFF')
}
</script>

<template>
  <div class="my-demo">
    <h1>根据图片变化背景颜色</h1>
    <el-row :gutter="20">
      <el-col
        :sm="24"
        :md="12"
        v-for="(item, index) in images"
        :key="item.src"
        :class="{
          mgTop: index == 2 || index == 3
        }"
      >
        <div class="imgBox">
          <img
            :src="item.src"
            crossorigin="anonymous"
            @mouseenter.self="handleMouseHover($event.target, index)"
            @mouseleave.self="handleMouseLeave"
            :style="{
              opacity: hoverIndex === -1 ? 1 : index === hoverIndex ? 1 : 0.2
            }"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.my-demo {
  background: linear-gradient(
    to bottom,
    var(--changeBackground1),
    var(--changeBackground2),
    var(--changeBackground3)
  );

  .imgBox {
    transition: transform 0.5s;
    height: 37vh;
    margin-top: 20px;
    &:hover {
      transform: scale(1.05);
      transform-origin: center center;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
