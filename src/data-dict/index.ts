import { compStore } from '@/stores/comp'
const store = compStore()

export const DICT = [
  {
    category: 'AI相关',
    type: 'AIboom',
    data: [
      {
        title: 'AI 资讯',
        list: [
          {
            name: 'open AI 推出ios客户端',
            type: 'link',
            url: 'https://apps.apple.com/us/app/openai-chatgpt/id6448311069'
          }
        ]
      },
      {
        title: 'AI 变现案例',
        list: [
          {
            name: '通过Midjourney绘画，副业月入3000',
            type: 'link',
            url: 'https://bqi1f7fsfpl.feishu.cn/docx/DLdndVjzhoLP44xUDBgcgx8mnFc'
          }
        ]
      },
      {
        title: 'AI 产品',
        list: [
          {
            name: 'chatGPT 最强竞品=>Claude食用教程',
            type: 'link',
            url: 'https://zhuanlan.zhihu.com/p/622363620'
          }
        ]
      },
      {
        title: 'AI 应用/教程系列',
        list: [
          {
            name: '国内注册chatGPT的方法',
            type: 'link',
            url: 'https://www.pythonthree.com/register-openai-chatgpt/'
          },
          {
            name: '在公司前端项目中落地chatGPT,提升50%开发效率',
            type: 'link',
            url: 'https://juejin.cn/post/7230319403723948093'
          },
          {
            name: '傻瓜式搭建自己的chatGPT网站',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/sIwsGYoJXVxF1tPPD0id0A'
          },
          {
            name: 'gitHub最高赞的chatGPT开源项目',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/VYFPKHe5MAKOXJvs_RCfFg'
          },
          {
            name: 'AI 作画火了，如何用 Serverless 函数计算部署 Stable Diffusion?',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/xIJL0MmUnu420qrASyyiQw'
          },
          {
            name: '如何成为提示工程的高手：2023年最全的在线指南',
            type: 'link',
            url: 'https://esouqpttmy.feishu.cn/docx/HFPPdJ8TborlQjxtkBFcXIVTnae'
          },
          {
            name: '简单30行代码，使用LangChain 搭建专属 GPT知识库',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/ILiFpws6AqFBcQ_KnooDXw'
          },
          {
            name: '微信快速接入ChatGPT',
            type: 'link',
            url: 'https://cloud.tencent.com/developer/article/2235918?areaSource=103001.3&traceId=oJdSIJKS4emYcFFZDuFbT'
          }
        ]
      }
    ]
  },
  {
    category: '文档',
    type: 'select',
    data: [
      {
        title: '框架文档',
        list: [
          {
            name: 'Vue3',
            type: 'link',
            url: 'https://v3.cn.vuejs.org/'
          },
          {
            name: 'React',
            type: 'link',
            url: 'https://react.docschina.org/'
          },
          {
            name: 'Vite',
            type: 'link',
            url: 'https://vitejs.cn/'
          },
          {
            name: 'Svelte',
            type: 'link',
            url: 'https://www.sveltejs.cn/'
          },
          {
            name: 'Angular',
            type: 'link',
            url: 'https://www.angularjs.net.cn/'
          },
          {
            name: 'NodeJS',
            type: 'link',
            url: 'https://nodejs.org/en/docs/'
          }
        ]
      }
    ]
  },
  {
    category: 'css-demo',
    type: 'scrollbar',
    list: [...store.keys]
  },
  {
    category: '在线chatGPT网站',
    type: 'GPT',
    url: 'https://hi-uli.fun'
  }
]
