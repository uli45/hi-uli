<script setup lang="ts">
import { ref, onMounted } from 'vue'
import md from './index.md?raw'
import textLine from '../transitionComp/line.vue'
import * as echarts from 'echarts'
import elementResizeDetectorMaker from 'element-resize-detector'

type EChartsOption = echarts.EChartsOption
const chartList = ref<string[]>(['polarBar', 'polarBar2', 'line', 'bar', 'YBar', 'pie'])

const chartOption = ref<EChartsOption>({
  polarBar: {
    title: {
      text: 20,
      textStyle: {
        color: '#fff',
        fontSize: 23
      },
      subtext: '小区总数(个)',
      subtextStyle: {
        color: '#fff',
        fontSize: 10
      },
      itemGap: 5, // 主副标题距离
      left: 'center',
      top: '38%'
    },
    tooltip: {
      trigger: 'item',
      confine: true
    },
    polar: {
      radius: ['35%', '80%'],
      center: ['50%', '50%']
    },
    angleAxis: {
      max: 100,
      startAngle: 90,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      type: 'category',
      data: ['未分类', '已分类'],
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      }
    },
    series: {
      type: 'bar',
      showBackground: true, // 展示背景阴影
      colorBy: 'data',
      barWidth: 8,
      // barCategoryGap: 20, // 柱形间距
      color: ['#00BDAE', '#88bedb', '#f8dc74', '#ee9665'],
      data: [
        {
          value: 55,
          label: {
            show: true,
            // rich: {
            //   time: {
            //     fontSize: 10,
            //     color: '#999'
            //   }
            // },
            color: '#fff',
            position: [-20, -30]
          },
          itemStyle: {
            //  #4C70F1～#5BFAD8
            // #E03855～#F1B219
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: '#E03855'
                },
                {
                  offset: 1,
                  color: '#F1B219'
                }
              ])
            }
          }
        },
        {
          value: 45,
          label: {
            show: true,
            // rich: {
            //   time: {
            //     fontSize: 10,
            //     color: '#999'
            //   }
            // },
            color: '#fff',
            position: [-20, 150]
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: '#4C70F1'
                },
                {
                  offset: 1,
                  color: '#5BFAD8'
                }
              ])
            }
          }
        }
      ],
      roundCap: true,
      coordinateSystem: 'polar',
      label: {},
      labelLine: {
        show: true
      }
    }
  },
  polarBar2: {
    title: {
      text: 55,
      textStyle: {
        color: '#fff',
        fontSize: 23
      },
      subtext: '餐饮机构总数(个)',
      subtextStyle: {
        color: '#fff',
        fontSize: 10
      },
      itemGap: 5, // 主副标题距离
      left: 'center',
      top: '38%'
    },
    // backgroundColor: '#111',
    polar: {
      //极坐标系地底板，类似于grid
      radius: ['60%', '75%'],
      center: ['50%', '50%']
    },
    angleAxis: {
      //角度轴，一个圆圈
      max: 100,
      show: true,
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    radiusAxis: {
      //径向轴，一段线段，type:'category'类目轴，类似的x轴的类目轴
      type: 'category',
      show: false,
      axisLabel: {
        show: true
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    series: [
      {
        name: '',
        type: 'bar', //柱状图
        roundCap: true,
        barWidth: 90,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255,255,255,0.2)'
        },
        data: [55],
        coordinateSystem: 'polar', //采用极坐标系
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                //color为渐变色
                offset: 0,
                color: '#5bfad8'
              },
              {
                offset: 1,
                color: '#4c70f1'
              }
            ])
          }
        }
      },
      {
        name: '',
        type: 'pie', //饼图
        startAngle: 90, //开始的角度
        radius: ['80%'],
        hoverAnimation: false,
        animation: false, //不开启动画，
        center: ['50%', '50%'],
        itemStyle: {
          color: 'rgba(66, 66, 66, .1)', //饼图的颜色，设置为透明
          borderWidth: 1, //主要显示边框
          borderColor: '#4c70f1'
        },
        data: [100]
      },
      {
        name: '',
        type: 'pie',
        startAngle: 80,
        radius: ['54%'],
        hoverAnimation: false,
        animation: false,
        center: ['50%', '50%'],
        itemStyle: {
          color: 'rgba(66, 66, 66, .1)',
          borderWidth: 1,
          borderColor: '#4c70f1'
        },
        data: [100]
      }
    ]
  },
  line: {
    legend: {
      left: 'right',
      top: '20',
      show: true,
      icon: 'roundRect',
      itemWidth: 15,
      itemHeight: 2, // 粗细
      itemStyle: {
        color: '#FFCE57'
      },
      textStyle: {
        color: '#BCD2E1',
        fontSize: 10
      },
      selectedMode: false
    },
    tooltip: {
      trigger: 'axis', // axis   item   none三个值
      // formatter: function (params) {
      //   return 33;
      // }
      confine: true
    },
    grid: {
      left: '3%',
      right: '10%',
      top: '20%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisTick: {
        alignWithLabel: true
      },
      nameLocation: 'center',
      nameTextStyle: {
        color: '#bcd2e1',
        fontSize: 10
      },
      minInterval: 1,
      axisLabel: {
        interval: 0
        // rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)', // 设置横线的颜色
          width: 1 // 设置横线的宽度
        }
      }
    },
    series: [
      {
        name: '占比',
        data: [10, 40, 20, 50, 30, 60, 90, 50, 100, 40, 80, 20],
        type: 'line',
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#FFCE57'
          // shadowColor: '#FFCE57'
        },
        //设置折线颜色和粗细
        lineStyle: {
          width: 2,
          color: '#FFCE57'
        },

        //设置面积区域为渐变效果
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            {
              offset: 0,
              color: 'rgba(0,0,0,0)'
            },
            {
              offset: 1,
              color: '#fFCE57'
            }
          ])
        }
      }
    ]
  },
  bar: {
    legend: {
      left: 'right',
      top: '20',
      textStyle: {
        color: '#bcd2e1',
        fontSize: 10
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 35,
      selectedMode: false
    },
    grid: {
      right: '10%',
      top: '20%',
      bottom: '30%'
    },
    xAxis: {
      type: 'category',
      data: ['航空新城', '三灶镇', '南水镇', '红旗镇', '平沙镇'],
      axisTick: {
        alignWithLabel: true
      },
      nameLocation: 'center',
      nameTextStyle: {
        color: '#bcd2e1',
        fontSize: 10
      },
      minInterval: 1,
      axisLabel: {
        interval: 0
        // rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)', // 设置横线的颜色
          width: 1 // 设置横线的宽度
        }
      }
    },
    series: [
      {
        name: '垃圾量占比',
        data: [120, 200, 150, 80, 70],
        type: 'bar',
        barWidth: '13',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: '#0C97A9' },
            { offset: 0.5, color: '#06bed7' },
            { offset: 0, color: '#01d8f5' }
          ])
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#bcd2e1',
            fontSize: 12
          }
        }
      }
    ]
  },
  YBar: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      left: 'right',
      top: '10',
      show: true,
      icon: 'rect',
      itemWidth: 15,
      itemHeight: 2, // 粗细
      itemStyle: {
        color: '#3cafd0'
      },
      textStyle: {
        color: '#BCD2E1',
        fontSize: 10
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)', // 设置横线的颜色
          width: 1 // 设置横线的宽度
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['测试测试测试测试测试', 'testtesttesttest', '测试test测试test'],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        interval: 0,
        margin: 20,
        formatter: function (value: any) {
          const length = value.length
          const partLength = Math.ceil(length / 3) // 计算每部分的长度
          const parts = []

          for (let i = 0; i < length; i += partLength) {
            parts.push(value.slice(i, i + partLength)) // 使用slice方法截取每部分的字符串
          }

          return `${parts[0]}\n${parts[1]}\n${parts[2]}`
        }
      }
    },
    series: [
      {
        name: '垃圾量',
        type: 'bar',
        data: [20, 50, 30],
        barWidth: 15,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: '#0C97A9' },
            { offset: 0.5, color: '#06bed7' },
            { offset: 0, color: '#01d8f5' }
          ])
        },
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ]
  },
  pie: {
    title: {
      text: (100000 / 1000).toFixed(2) + 't',
      textStyle: {
        color: '#5AF9FF',
        fontSize: 18
      },
      subtext: '垃圾总量',
      subtextStyle: {
        color: '#bcd2e1'
      },
      itemGap: 10, // 主副标题距离
      left: 'center',
      top: '30%'
    },
    legend: {
      top: '5%',
      left: 'center',
      show: false
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,0)'
        },
        label: {
          show: false,
          position: 'center'
        },

        labelLine: {
          show: false
        },
        data: [
          {
            value: (50000 / 1000).toFixed(2),
            name: '厨余垃圾',
            itemStyle: { color: '#4BD364' }
          },
          {
            value: (70000 / 1000).toFixed(2),
            name: '其他垃圾',
            itemStyle: { color: '#B5B5B5' }
          },
          {
            value: (60000 / 1000).toFixed(2),
            name: '可回收垃圾',
            itemStyle: { color: '#3582E6' }
          },
          {
            value: (40000 / 1000).toFixed(2),
            name: '有害垃圾',
            itemStyle: { color: '#DA2C36' }
          }
        ]
      }
    ]
  }
})
const createdChart = (item: string) => {
  let chartDom = document.getElementById(item)!
  let myChart = echarts.init(chartDom)
  let option: any
  option = chartOption.value[item]
  option && myChart.setOption(option)
  const erd = elementResizeDetectorMaker()
  erd.listenTo(chartDom, function () {
    myChart.resize()
  })
}

onMounted(() => {
  for (const item of chartList.value) {
    createdChart(item)
  }
})
</script>

<template>
  <div class="my-demo my-echarts">
    <div class="title">
      <span>一些常见的echarts图表</span>
      <textLine :md="md"></textLine>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in chartList" :key="item">
        <div :id="item" class="chartBox"></div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
.my-echarts {
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  overflow: hidden;
  padding: 20px;
  .title {
    font-size: 18px;
    font-weight: 500;
    height: 30px;
    display: flex;
    span {
      margin-right: 20px;
    }
  }
  .chartBox {
    height: 200px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 20px;
  }
}
</style>
