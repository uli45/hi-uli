# 利用贝塞尔曲线实现任意2点之间连线
```vue
    <script setup lang='ts'>
    import { onMounted, ref } from 'vue'
    import md from './index.md?raw'
    import textLine from '../transitionComp/line.vue'

    /**  
     * 定义一个矩形类型接口
     */
    interface recObj {
        x: number
        y: number
        width: number
        height: number
        color: string
    }
    const recData = ref<recObj[]>([])
    const canvas: any = ref(null)
    const ctx: any = ref(null)
    const store: any = ref({})



    /** 
     * 初始化矩形数据
    */
    const initRec = () => {
        recData.value = [
            {
                x: 800,
                y: 180,
                width: 300,
                height: 180,
                color: 'deepskyblue'
            }, {
                x: 600,
                y: 680,
                width: 320,
                height: 100,
                color: 'deeppink'
            }
        ]
    }
    /**   
     * 初始化canvas宽高 得到canvas上下文对象 
    */
    const initCanvasSize = () => {
        //可以这样设置
        const canvasStyle = window.getComputedStyle(canvas.value);
        const width = canvasStyle.getPropertyValue('width');
        const height = canvasStyle.getPropertyValue('height');
        canvas.value.width = parseInt(width) * devicePixelRatio
        canvas.value.height = parseInt(height) * devicePixelRatio
        ctx.value = canvas.value.getContext('2d', { willReadFrequentLy: true })
    }

    /**
     * 绘制矩形
     */
    const drawRect = () => {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height) // 清空画布
        recData.value.forEach((obj: recObj) => {
            ctx.value.beginPath()
            ctx.value.fillStyle = obj.color
            ctx.value.fillRect(obj.x, obj.y, obj.width, obj.height)
            ctx.value.closePath()
        })
    }
    /**
     * 绘制曲线
     */
    const drawCurve = () => {
        const dataSort = recData.value.sort((objA, objB) => {
            return objA.y + objA.height - (objB.y + objB.height)
        })
        const from = dataSort[0]
        const to = dataSort[1]
        const fromX = from.x + from.width / 2
        const fromY = from.y + from.height
        const toX = to.x + to.width / 2
        const toY = to.y
        const cp1x = fromX
        const cp1y = fromY + (toY - fromY) / 2
        const cp2x = toX
        const cp2y = toY - (toY - fromY) / 2
        ctx.value.beginPath()
        ctx.value.lineWidth = 4
        ctx.value.strokeStyle = '#000'
        ctx.value.moveTo(fromX, fromY)
        ctx.value.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, toX, toY)
        ctx.value.stroke()
    }
    /**  
     *  并绘制recData内的矩形数据
    */
    const draw = () => {
        ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
        drawRect()
        drawCurve()
    }

    /**
     *  判断点是否在矩形内
     * @param x number  x轴
     * @param y number  y轴
     */
    const isPointInSquare = (x: number, y: number) => {
        store.value.isPointInA = false
        store.value.isPointInB = false
        recData.value.some((obj, index) => {
            if (!(x < obj.x || x > obj.x + obj.width || y < obj.y || y > obj.y + obj.height)) {
                return (store.value['isPointIn' + ['A', 'B'][index]] = true)
            }
        })
    }

    /** 
     * 给canvas 绑定事件   pointerdown pointermove pointerup
     * 
     */
    const addEventListeners = () => {
        canvas.value.addEventListener(
            'pointerdown',
            canvas.value.addEventListener('pointerdown', (event: any) => {
                const bound = canvas.value.getBoundingClientRect()
                const scaleX = canvas.value.width / bound.width
                const scaleY = canvas.value.height / bound.height
                const clientX = event.clientX
                const clientY = event.clientY
                const clickX = (clientX - bound.left) * scaleX
                const clickY = (clientY - bound.top) * scaleY
                isPointInSquare(clickX, clickY)
                store.value.clientX = clientX
                store.value.clientY = clientY
                store.value.dataMatch = recData.value[Number(store.value.isPointInB)]
                store.value.originX = store.value.dataMatch.x
                store.value.originY = store.value.dataMatch.y
                store.value.scaleX = scaleX
                store.value.scaleY = scaleY
            })
        )

        canvas.value.addEventListener(
            'pointermove',
            (event: any) => {
                if (!store.value.isPointInA && !store.value.isPointInB) {
                    return
                }

                event.preventDefault()
                const dataMatch = store.value.dataMatch
                const distanceX = (event.clientX - store.value.clientX) * store.value.scaleX
                const distanceY = (event.clientY - store.value.clientY) * store.value.scaleY
                dataMatch.x = store.value.originX + distanceX
                dataMatch.y = store.value.originY + distanceY

                if (dataMatch.x < 0) {
                    dataMatch.x = 0
                } else if (dataMatch.x + dataMatch.width > canvas.value.width) {
                    dataMatch.x = canvas.value.width - dataMatch.width
                }

                if (dataMatch.y < 0) {
                    dataMatch.y = 0
                } else if (dataMatch.y + dataMatch.height > canvas.value.height) {
                    dataMatch.y = canvas.value.height - dataMatch.height
                }

                draw()
            },
            {
                passive: false,
            }
        )

        canvas.value.addEventListener('pointerup', () => {
            store.value.isPointInA = store.value.isPointInB = false
        })
    }
    onMounted(() => {
        initRec()
        initCanvasSize()
        draw()
        addEventListeners()

    })
    </script>

    <template>
        <div class="my-demo anyLineInBezier">
            <div class="title">
                <span>
                    利用贝塞尔曲线实现任意2点之间连线
                </span>
                <textLine :md="md"></textLine>
            </div>
            <canvas class="canvas" ref="canvas"></canvas>
        </div>
    </template>

    <style scoped lang='less'>
    .anyLineInBezier {
        background-color: #fff;
        // color: #fff;
        // overflow: hidden;

        .title {
            font-size: 18px;
            font-weight: 500;
            height: 30px;
            display: flex;
            height: 30px;

            span {
                margin-right: 20px;
            }
        }

        .canvas {
            display: block;
            width: 100%;
            height: calc(100% - 30px);
            background: conic-gradient(#eee 25%, white 0deg 50%, #eee 0deg 75%, white 0deg) 0 / 20px 20px;

            margin-inline: auto;
            touch-action: none;
        }
    }
    </style>
```
