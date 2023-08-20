import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
//使用的是vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'

import Prism from 'prismjs'
import hljs from 'highlight.js'
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
  Hljs: hljs,
  codeHighlightExtensionMap: {
    vue: 'html'
  }
})
VueMarkdownEditor.use(createLineNumbertPlugin())
VueMarkdownEditor.use(createCopyCodePlugin())
export default VueMarkdownEditor
