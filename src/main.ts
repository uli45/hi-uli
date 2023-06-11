import { createApp } from 'vue'
import type {DirectiveBinding} from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//引入批量注册的组件
import baseComponents from '@/components/index'
//element 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入全局样式
import '@/assets/styles/main.less'
//CSS 重置
import 'normalize.css'
//自定义全局样式
import '@/assets/styles/common.less'

//自定义全局指令
import directive from '@/utils/index'
// markdown 
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

const app = createApp(App)

// 注册自定义指令

app.directive('slide', directive);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(baseComponents)
app.use(router)
app.use(ElementPlus, { size: 'small' })
app.use(VMdPreview);
app.mount('#app')
