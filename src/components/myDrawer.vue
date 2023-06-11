<script setup lang='ts'>
defineProps({
    modelValue: {
        type: Boolean,
        default: false,
        required: true
    },
    text: {
        required: true
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
        <el-drawer append-to-body :model-value="modelValue" :with-header="false" size="40%" @close="handleClose">
            <div class="markdown">
                <v-md-preview class="preview" :text="text" ref="preview"></v-md-preview>
            </div>
        </el-drawer>

    </div>
</template>

<style scoped lang="less"></style>