<script setup lang="ts">
import {} from 'vue'
import textLine from '@/components/transitionComp/line.vue'
import md from './index.md?raw'
</script>

<template>
  <div class="my-demo">
    <div class="text">
      <textLine :md="md" />
    </div>
    <div class="shell">
      <details open>
        <summary>文件夹名称</summary>
        <div class="folder">
          <details open>
            <summary>文件夹名称</summary>
            <div class="folder">
              <p>文件名称</p>
              <details open>
                <summary>文件夹名称</summary>
                <div class="folder">
                  <p>文件名称</p>
                  <details open>
                    <summary>文件夹名称</summary>
                    <div class="folder">
                      <p>文件名称</p>
                      <details open>
                        <summary>文件夹名称</summary>
                        <div class="folder">
                          <img src="../../assets/images/go.gif" width="150" alt="" />
                        </div>
                      </details>
                    </div>
                  </details>
                </div>
              </details>
            </div>
          </details>
          <details open>
            <summary>文件夹名称</summary>
            <div class="folder">
              <p>文件名称</p>
              <details open>
                <summary>文件夹名称</summary>
                <div class="folder">
                  <p>文件名称</p>
                </div>
              </details>
            </div>
            <p>文件名称</p>
          </details>
        </div>
      </details>
    </div>
  </div>
</template>

<style scoped lang="less">
.my-demo {
  background-color: #223;
  color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .text {
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .shell {
    position: relative;
    display: block;
    min-width: 500px;
    details {
      position: relative;
      width: auto;
      height: auto;
      overflow: hidden;
      max-height: 2.5em;
      transition: 1s;
      &[open] {
        max-height: 700px;
        & > summary {
          background-color: #66e;
          color: #fff;

          &::before {
            content: '⊟';
            color: #fff;
          }
        }
      }
      & > summary {
        position: relative;
        margin-top: 0.25em;
        color: #99e;
        padding: 0.25em 0.5em 0.15em;
        background-color: #444;
        &::before {
          content: '⊞';
          color: #eee;
          margin-right: 0.5em;
        }
      }
      .folder {
        border-left: 3px dotted #fff;
        border-bottom: 3px dotted #fff;
        margin: 0 0 10px 10px;
        padding: 10px 0 10px 20px;
      }
    }
  }
}
</style>
