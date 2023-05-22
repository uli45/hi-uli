<script lang="ts" setup name="Layout">
import { ref, shallowRef, watch } from 'vue'
import { compStore } from '@/stores'
import { DICT } from '@/data-dict'
import { ElNotification } from 'element-plus'
// 图标大小
const iconSize = ref(14)
//图标颜色
const iconColor = ref('#ccc')
//鼠标移入移除
const show = ref(false)
const activeIndex = ref(1)
const myMouseover = (type: string, index: number) => {
  if (type === 'select') {
    activeIndex.value = index
    show.value = true
  }
}
//跳转外链
const toLink = (type: string, link: string | undefined) => {
  if (type === 'link') {
    show.value = false
    window.open(link, '_blank')
  } else if (type === 'GPT') {
    ElNotification({
      title: '正在跳转...',
      message: '访问密码：0617',
      type: 'success',
      duration: 1500
    })
    setTimeout(() => {
      window.open(link, '_blank')
    }, 1500)
  }
}
//组件名称
const store = compStore()
let currentComp = shallowRef('')
const changeComp = (name: string) => {
  store.changeActiveKey(name)
}
watch(
  () => store.activeKey,
  (activeKey) => {
    if (activeKey) {
      currentComp.value = store.activeKey
    } else {
      currentComp.value = store.keys[0].componentName
      changeComp(currentComp.value)
    }
  },
  {
    immediate: true
  }
)

// 切换组件
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="my-header">
        <div class="left-header">
          <h1>uliの小窝</h1>
        </div>
        <div class="right-header">
          <div
            class="item"
            v-for="(item, index) in DICT"
            :key="item.category"
            @click="toLink(item.type, item?.url)"
            @mouseenter="myMouseover(item.type, index)"
            @mouseleave="show = false"
            :class="{ active: index === 3 }"
          >
            {{ item.category }}
            <span v-show="item.type === 'select' || item.type === 'AIboom'">
              <el-icon class="icon" :size="iconSize" :color="iconColor">
                <CaretBottom />
              </el-icon>
              <transition name="el-fade-in-linear">
                <div class="select" v-show="show && index === activeIndex">
                  <el-scrollbar max-height="80vh">
                    <template v-for="i in item.data" :key="i.title">
                      <div class="title">{{ i.title }}</div>
                      <div
                        class="options ellipsis"
                        v-for="v in i.list"
                        :key="v.url"
                        @click.self="toLink(v.type, v.url)"
                      >
                        <el-tooltip :content="v.name" placement="left-start">
                          {{ v.name }} <el-icon><Link /></el-icon>
                        </el-tooltip>
                      </div>
                    </template>
                  </el-scrollbar>
                </div>
              </transition>
            </span>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-scrollbar max-height="90vh">
            <div
              v-for="item in store.keys"
              :key="item.title"
              class="hoverShadow scrollbar-demo-item pointer"
              :class="{ active: currentComp === item.componentName }"
              @click="changeComp(item.componentName)"
            >
              <!-- <p>{{ item.title }}</p> -->
              <p>{{ item.desc }}</p>
            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <component :is="currentComp"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.common-layout {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #fff;
  .my-header {
    display: flex;
    border-bottom: 1px solid #efebeb;
    line-height: 60px;
    justify-content: space-between;
    align-items: center;
    .left-header {
      h1 {
        color: @xtxColor;
      }
    }
    .right-header {
      text-align: right;
      font-size: 14px;
      .item {
        cursor: pointer;
        display: inline-block;
        margin-right: 20px;
        text-align: center;
        position: relative;
        .select {
          position: absolute;
          top: 50px;
          left: -50px;
          max-width: 300px;
          border-radius: 2px;
          border: 1px solid #efebeb;
          background-color: #fff;
          padding: 10px 20px;
          text-align: left;
          z-index: 1000;
          color: #000;
          .title {
            font-size: 14px;
            font-weight: 600;
            line-height: 2;
            white-space: nowrap;
            cursor: default;
          }
          .options {
            cursor: pointer;
            line-height: 2;
            white-space: nowrap;
            text-indent: 1em;

            &:hover {
              color: @hoverColor;
            }
          }
        }
        .icon {
          vertical-align: -1px;
        }
        // &:hover {
        //   color: @hoverColor;
        // }
      }
    }
  }
  .scrollbar-demo-item {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // height: 50px;
    margin: 10px;
    // text-align: center;
    padding: 10px;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>
