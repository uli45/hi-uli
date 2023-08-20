<script setup lang="ts">
import { ref } from 'vue'
import MdEdtior from './MdEdtior.vue'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
    required: true
  },
  text: {
    required: true,
    type: String
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
}>()

const handleClose = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="">
    <el-drawer
      append-to-body
      :model-value="modelValue"
      :with-header="false"
      size="60%"
      @close="handleClose"
    >
      <!-- <div class="markdown">
        <v-md-preview
          class="preview"
          :text="props.text"
          ref="preview"
          @copy-code-success="handleCopyCodeSuccess"
        ></v-md-preview>
      </div> -->
      <MdEdtior :modelValue="props.text" />
    </el-drawer>
  </div>
</template>

<style scoped lang="less"></style>
