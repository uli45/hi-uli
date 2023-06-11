
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const count = ref(0)
const load = () => {
    return

}
onMounted(() => {
    // return
    count.value = 100
    for (let i = 0; i < count.value; i++) {
        randomColor()
    }
})

const colorList = ref<string[]>([])

const randomColor = () => {
    const letters: string = "0123456789ABCDEF";
    let color: string = "#";
    for (let i: number = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    colorList.value.push(color)
}
</script>
<template>
    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-for="i in count"  v-slide="{ opacity:'0.5',translateY:100,backTranslateY:20,transform:'ease'}" :key="i" class="infinite-list-item" :style="{backgroundColor:colorList[i]}" >{{ colorList[i] }}</li>
       
        <!-- <li v-for="i in count"  v-slide :key="i " class="infinite-list-item" :style="{backgroundColor:colorList[i]}" >{{ colorList[i] }}</li> -->
       
    </ul>
</template>
  

  
<style>
.infinite-list {
    height: 100vh;
    padding: 0;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}

</style>
  