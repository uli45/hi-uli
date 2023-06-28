## 封装一个自定义指令实现平滑移动 

- 指令名称 `v-slide`
- 用法 需要 传递 `3个参数`   
  -  `duration` 动画持续时长 默认 `1000` 毫秒   `number 类型`
  -  `translateY` 移动距离  默认 `100`    `number类型`
  -  `easing` 动画模式 默认 `ease`   `string 类型`
  
  ## 创建步骤
- 在 `utils` 文件夹中创建 `index.ts` 
   - 代码如下
  ```ts
        const DISTANCE = 100
    const DURATION = 1000
    const animationMap = new WeakMap<any>()
    const ob = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const animation = animationMap.get(entry.target)
                animation?.play()
                ob.unobserve(entry.target)
            }
        }
    })

    function isBelowViewport(el: HTMLElement): boolean {
        const rect = el.getBoundingClientRect()
        return rect.top < window.innerHeight
    }

    export default {
        mounted(el: HTMLElement, binding: any) {
            if (isBelowViewport(el)) {
                return
            }
            const animation = el.animate(
                [
                    {
                        transform: `translateY(${
                            binding.value.translateY ? binding.value.translateY : DISTANCE
                        }px)`,
                        opacity: 0.5
                    },
                    {
                        transform: 'translateY(0)',
                        opacity: 1
                    }
                ],
                {
                    duration: binding.value.duration ? binding.value.duration : DURATION,
                    easing: binding.value.easing ? binding.value.easing : 'ease'
                }
            )
            animation.pause()
            animationMap.set(el, animation)
            ob.observe(el)
        },
        unmounted(el: HTMLElement) {
            ob.unobserve(el)
        }
    }

  ```
  - 然后在 `main.ts` 中导入 该文件 并创建 指令
  ```ts
        //自定义全局指令
    import directive from '@/utils/index'

    // 注册自定义指令

    app.directive('slide', directive)

  ```
## 调用方法xs
    
    
    1、不传递参数 直接调用
        v-slide

    2、传递参数
        v-slide = {参考以上参数}
        

 ##  最后调用该自定义指令 

   
         <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
      <li
      v-for="i in count"
      v-slide="{ duration: 1000, easing: 'ease', translateY: 150 }"
      :key="i"
      class="infinite-list-item"
      :style="{ backgroundColor: colorList[i] }" >
      {{ colorList[i] }}
     </li>
    </ul>
 