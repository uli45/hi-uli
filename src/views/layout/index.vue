<script lang="ts" setup name="Layout">
import { ref, shallowRef } from 'vue'
import { compStore } from '@/stores'
import { DICT } from '@/data-dict'
import { ElNotification } from 'element-plus'
// 图标大小
const iconSize = ref(14)
//图标颜色
const iconColor = ref('#ccc')
//鼠标移入移除
const show = ref(false)
//跳转外链
const toLink = (link: string) => {
  window.open(link, '_blank')
}
const toChatGPT = () => {
  ElNotification({
    title: '正在跳转...',
    message: '访问密码：0617',
    type: 'success',
    duration: 1500
  })
  setTimeout(() => {
    window.open('https://hi-uli.fun', '_blank')
  }, 1500)
}
//组件名称
const store = compStore()

const currentComp = store.keys[0].componentName
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="my-header">
        <div class="left-header">
          <h1>hi-uliの小窝</h1>
        </div>
        <div class="right-header">
          <div class="item" @mouseover="show = true" @mouseout="show = false">
            文档
            <el-icon class="icon" :size="iconSize" :color="iconColor">
              <CaretBottom />
            </el-icon>
            <transition name="el-fade-in-linear">
              <div class="select" v-show="show">
                <template v-for="item in DICT.doc" :key="item.title">
                  <div class="title">{{ item.title }}</div>
                  <div class="options" v-for="i in item.data" :key="i.url" @click="toLink(i.url)">
                    {{ i.name }} <el-icon><Link /></el-icon>
                  </div>
                </template>
              </div>
            </transition>
          </div>
          <div class="item">css-demo</div>
          <div class="item" @click="toChatGPT">在线chatGPT网站</div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="300px">
          <el-scrollbar max-height="90vh">
            <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
              {{ item }}
            </p>
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
          border-radius: 2px;
          border: 1px solid #efebeb;
          background-color: #fff;
          padding: 10px 20px;
          text-align: left;
          z-index: 100;
          .title {
            font-size: 14px;
            font-weight: 600;
            line-height: 2;
            white-space: nowrap;
          }
          .options {
            cursor: pointer;
            line-height: 2;
            white-space: nowrap;

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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}
</style>
