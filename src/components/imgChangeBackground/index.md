
## 根据图片改变背景色 

- 使用 `ColorThief` 插件 配合css变量 实现该效果
  
 - 1、先安装 
  
     ```bash
        pnpm i ColorThief
     ```
- 2、在组件内引用 创建实例
   
    ```bash
    import ColorThief from 'colorthief'

    const colorThief = new ColorThief()
    ```

- 3、主要代码 
  
  ```javascript
  // 使用 colorThief.getPalette 插件获取 当前图片中所有颜色占比最高的3个
    const colors = await colorThief.getPalette(img, 3)
    //然后 创建一个颜色数组，
    const [c1, c2, c3] = colors.map((c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`)
    //最后把该颜色数组赋值给css变量  在css里面调用该变量实现改变背景色
    html.style.setProperty('--changeBackground1', c1)
    html.style.setProperty('--changeBackground2', c2)
    html.style.setProperty('--changeBackground3', c3)
  ```
  ### ps  ColorThief 更多用法请自行询问 chatGPT


- 4、完整代码
   
  ```html
  <!-- html 部分 -->
    <template>
  <div class="my-demo changeBackGround">
    <el-row :gutter="20">
      <el-col :sm="24" :md="12" v-for="(item, index) in images" :key="item.src" :class="{
        mgTop: index == 2 || index == 3
      }">
        <div class="imgBox">
          <img :src="item.src" crossorigin="anonymous" @mouseenter.self="handleMouseHover($event.target, index)"
            @mouseleave.self="handleMouseLeave" :style="{
              opacity: hoverIndex === -1 ? 1 : index === hoverIndex ? 1 : 0.2
            }" />
        </div>
      </el-col>
    </el-row>
  </div>
    </template>
  ```

  ```typescript
  <script setup lang="ts">
  // typescript 部分
    import { ref } from 'vue'
    //导入颜色提取器插件
    import ColorThief from 'colorthief'
    //导入element的 消息提示组件
    import { ElMessage } from 'element-plus'

    //定义的type 文件，需要自己定义  也可以在当前文件内定义 
    // 例
    // export type img = {
    //   src: string
    //   alt: string
    // }
    // export type imgs = img[]

    import type { imgs,  } from '@/types/compInfo'

    //定义实例
    const colorThief = new ColorThief()

    //随机获取图片的免费接口
    const images = ref<imgs>([])
    for (let i = 1; i <= 4; i++) {
        images.value.push({
        src: `https://picsum.photos/1920/1080?r=${i}`,
        alt: `这是随机获取的图片，当你看到这句话时该刷新页面了`
     })
    }
    //当前选中的图片
    const hoverIndex = ref(-1)
    //获取根节点元素
    const html = document.documentElement
    //获取当前选择的图片中颜色占比最高的3个颜色，然后将该颜色赋值给根节点的css变量
    const handleMouseHover = async (img: any, index:  number) => {
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
    //鼠标离开图片后 改变回默认颜色
    const handleMouseLeave = () => {
     hoverIndex.value = -1
    html.style.setProperty('--changeBackground1', 'rgba(0, 0, 0, 0)')
    html.style.setProperty('--changeBackground2', 'rgba(0, 0, 0, 0)')
    .style.setProperty('--changeBackground3', 'rgba(0, 0, 0, 0)')
    }

    </script>
  ```

  ```less 
  <style scoped lang="less">
  <!-- css部分 -->
    .changeBackGround {
     width: 100%;
    height: 100vh;
  background: linear-gradient(to bottom,
      var(--changeBackground1),
      var(--changeBackground2),
      var(--changeBackground3));

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
  ```