# 一个完全css实现的时钟
- 主要是使用`sin()/cos()`数学三角函数实现 该功能
- 所有现代浏览器均支持了 CSS 数学函数中的三角函数 如下：

    - `sin()`
    - `cos()`
    - `tan()`
    - `asin()`
    - `acos()`
    - `atan()`
    - `atan2()`
      
      - 这7个三角函数中，有的函数根据角度返回对应的弧度值，有的是根据弧度值返回对应的角度值（以字母 a 打头的那几个函数）
      - 
        ```bash
        /* 正弦函数 */
        width: calc(100px * sin(45deg));
        /* 反正弦 */
        transform: rotate(asin(-0.2));
        ```

# 本文全部代码 

```vue
  <script setup lang='ts'>
  import { reactive } from 'vue'
  import md from './index.md?raw'
  import textLine from '../transitionComp/line.vue'

  const time = new Date()
  const hour = -3600 * (time.getHours() % 12)
  const mins = -60 * time.getMinutes()
  const seconds = -1 * time.getSeconds()



  </script>

  <template>
    <div class="my-demo cssClock">
      <div class="title">
        <span>完全由css生成的时钟</span>
        <textLine :md="md"></textLine>
      </div>
      <div class="clock">
        <div class="clock-face" id="clock-face" :style="{ '--minute': mins +'s', '--hour': hour+mins+'s', '--seconds': seconds+'s'}">
          <time style="--index:9" datetime="12:00">12</time>
          <time style="--index:10" datetime="1:00">1</time>
          <time style="--index:11" datetime="2:00">2</time>
          <time style="--index:0" datetime="3:00">3</time>
          <time style="--index:1" datetime="4:00">4</time>
          <time style="--index:2" datetime="5:00">5</time>
          <time style="--index:3" datetime="6:00">6</time>
          <time style="--index:4" datetime="7:00">7</time>
          <time style="--index:5" datetime="8:00">8</time>
          <time style="--index:6" datetime="9:00">9</time>
          <time style="--index:7" datetime="10:00">10</time>
          <time style="--index:8" datetime="11:00">11</time>
          <span class="arm seconds"></span>
          <span class="arm minutes"></span>
          <span class="arm hours"></span>
        </div>
      </div>
    </div>
  </template>

  <style scoped lang='less'>
  .cssClock {
    .title {
      font-size: 18px;
      font-weight: 500;
      height: 30px;
      display: flex;

      span {
        margin-right: 20px;
      }
    }
  }
  </style>
  <style>

  .clock {
    --clock-width: clamp(5rem, 60vw, 20rem);
    --face-width: 88cqi;
    --radius: calc((var(--face-width) - var(--time-size)) / 2);
    --time-size: 12cqi;

    background: #222;
    block-size: var(--clock-width);
    border-radius: 1rem;
    container-type: inline-size;
    display: grid;
    font-family: ui-sans-serif, system-ui, sans-serif;
    inline-size: var(--clock-width);
    margin-inline: auto;
    place-content: center;
  }

  .clock-face {
    aspect-ratio: 1;
    background: #fff;
    border-radius: 50%;
    block-size: var(--face-width);
    font-size: 6cqi;
    font-weight: 700;
    inline-size: var(--face-width);
    position: relative;
  }

  .clock-face time {
    --x: calc(var(--radius) + (var(--radius) * cos(var(--index) * 30deg)));
    --y: calc(var(--radius) + (var(--radius) * sin(var(--index) * 30deg)));
    display: grid;
    height: var(--time-size);
    left: var(--x);
    place-content: center;
    position: absolute;
    top: var(--y);
    width: var(--time-size);
  }


  .arm {
    background-color: var(--_abg);
    border-radius: calc(var(--_aw) * 2);
    display: block;
    height: var(--_ah);
    left: calc((var(--face-width) - var(--_aw)) / 2);
    position: absolute;
    top: calc((var(--face-width) / 2) - var(--_ah));
    transform: rotate(0deg);
    transform-origin: bottom;
    width: var(--_aw);
  }
  .seconds {
    --_abg: rgb(255, 140, 5);
    --_ah: 40cqi;
    --_aw: 1cqi;
    animation: turn 60s linear infinite;
    animation-delay: var(--seconds, 0ms);
  }

  .minutes {
    --_abg: #333;
    --_ah: 35cqi;
    --_aw: 2cqi;
    animation: turn 3600s steps(60, end) infinite;
    animation-delay: var(--minute, 0ms);
  }

  .hours {
    --_abg: #333;
    --_ah: 25cqi;
    --_aw: 2.5cqi;
    animation: turn 43200s linear infinite; /* 60 * 60 * 12 */
    animation-delay: var(--hour, 0ms);
    position: relative;
  }

  .hours::before {
    background-color: #fff;
    border: 1cqi solid #333;
    border-radius: 50%;
    content: "";
    display: block;
    height: 4cqi;
    position: absolute;
    bottom: -3cqi;
    left: -1.75cqi;
    width: 4cqi;
  }


  @keyframes turn {
    to {
      transform: rotate(1turn);
    }
  }

  </style>
```

#### 来源 [张鑫旭大佬](https://www.zhangxinxu.com/wordpress/2023/06/css-sin-cos-tan-function/)