<template>
  <!-- <v-md-editor
    :placeholder="placeholder"
    :disabled-menus="[]"
    v-model="newValue"
    :height="height"
    @change="handleChange"
  ></v-md-editor> -->
  <v-md-editor
    :model-value="newValue"
    mode="preview"
    @copy-code-success="handleCopyCodeSuccess"
  ></v-md-editor>
</template>
<script lang="ts" setup>
import { ElNotification } from 'element-plus'
// import { getLang } from '@/utils/auth'
import { computed } from 'vue'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'
import zhEn from '@kangc/v-md-editor/lib/lang/zh-CN'
import VueMarkdownEditor from '@kangc/v-md-editor'
// const lang = getLang() === 'zh-cn' ? 'zh-CN' : 'en-US'
// const langObj = getLang() === 'zh-cn' ? zhEn : enUS
VueMarkdownEditor.lang.use('zh-CN', zhEn)
// ......上面这些是多语言配置，如果用不到切换语言请忽略 ......
interface Props {
  modelValue: string
  height?: string // 编辑器的高度
  placeholder?: string
}
interface EmitEvent {
  (e: 'update:modelValue', params: string): void
}
const props = withDefaults(defineProps<Props>(), {
  height: '500px',
  placeholder: '请输入内容'
})
const emit = defineEmits<EmitEvent>()
//编辑才需要 现在不需要编辑
const newValue = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emit('update:modelValue', value)
  }
})
// 内容变化时触发的事件。text 为输入的内容，html 为解析之后的 html 字符串。
const handleChange = (text: string, html: string) => {
  // console.log(JSON.stringify(text))
  console.log(html)
  // 如果有需要这些值，可以传回给父组件
}
const handleCopyCodeSuccess = () => {
  //   console.log(code)
  ElNotification({
    title: 'Copy Code',
    message: 'Copy Code Success',
    duration: 2000,
    type: 'success'
  })
}
</script>
<style lang="scss" scoped></style>
