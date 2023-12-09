# 安卓 ios input 自动聚焦

```js
// 封装一个自动聚焦的函数,兼容ios和安卓
const autofocusFn = () => {
    const doc = document const input= doc.querySelector('#hide-focus-input')
    let dom = null
     //1.检查文档有没有一个id为hide-focus-input的input标签
     // 2.如果有,dom等于这个input标签
     //3.如果没有，则创建一个id为hide-focus-input的input标签，并添加样式(第一次执行时走这步)
      //4.调通input的原生focus方法来聚焦
      if (input) {
         dom = input
         }
       else {
        dom = doc.createElement('input')
        dom.setAttribute('id', 'hide-focus-input')
        dom.style = 'position: absolute; z-index: -9999; width:0; height: 0; left:-9999px; top:0 '
        doc.body.appendChild(dom) } dom.focus()
        }
//如果是封装在一个js文件，则暴露出去，在用的地方用import引入
 export { autofocusFn }
```

### 调用

```js
<template>
 <div @click="searchClick">点击搜索</div>
</template>
<script>
import { autofocusFn } from '你放函数的文件路径'
export default {
 methods: {
   searchClick() {
     autofocusFn()
     this.$router.push('真正带搜索input的页面')
   },
 },
}
</script>
```

最后，在需要自动聚焦弹出键盘的页面上调用 input 的聚焦方法

普通的 input

```js
<template>
  <div>
    <input v-model="searchVal" autofocus ref="searchRef" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: '',
    }
  },
  mounted() {
    this.$refs.searchRef.focus()
  },
}
</script>

<style></style>
```

在 uview 中

```js
<template>
	<view class="home-search">
			<u-search
				:focus="focus"
				auto-focus
				v-model="keyword"
			></u-search>

	</view>
</template>

<script>
export default {
	name: 'home-search',
	data() {
		return {
			keyword: '',

			focus: true,
		};
	},


};
</script>

<style lang="scss"></style>

```

vue3

```ts
// 封装一个自动聚焦的函数,兼容ios和安卓
const autofocusFn = () => {
  const doc: Document = document
  const input: HTMLInputElement | null = doc.querySelector('#hide-focus-input')
  let dom: HTMLInputElement | null = null
  // 1.检查文档有没有一个id为hide-focus-input的input标签
  // 2.如果有,dom等于这个input标签
  // 3.如果没有，则创建一个id为hide-focus-input的input标签，并添加样式(第一次执行时走这步)
  // 4.调通input的原生focus方法来聚焦
  if (input) {
    dom = input
  } else {
    dom = doc.createElement('input')
    dom.setAttribute('id', 'hide-focus-input')
    dom.style.position = 'absolute'
    dom.style.zIndex = '-9999'
    dom.style.width = '0'
    dom.style.height = '0'
    dom.style.left = '-9999px'
    dom.style.top = '0'
    doc.body.appendChild(dom)
  }
  dom.focus()
}
//如果是封装在一个ts文件，则暴露出去，在用的地方用import引入
export { autofocusFn }
```
