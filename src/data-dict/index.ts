import { compStore } from '@/stores/comp'
const store = compStore()

export const DICT = [
  {
    category: 'AI相关',
    type: 'select',
    data: [
      {
        title: 'AI 资讯',
        list: [
          {
            name: 'open AI 推出ios客户端',
            type: 'link',
            url: 'https://apps.apple.com/us/app/openai-chatgpt/id6448311069'
          },
          {
            name: '🩺 首个会看胸部X光片的中文多模态医学大模型',
            type: 'link',
            url: 'https://github.com/WangRongsheng/XrayGLM'
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
          },
          {
            name: '靠AI自动生成视频撸自媒体收益，月入5000+',
            type: 'link',
            url: 'https://o0y36dyw6y5.feishu.cn/docx/WATsdiYCWoRCyyxvj0Qc0wiLn0f'
          },
          {
            name: '靠AI自动生成视频撸自媒体收益，月入5000+',
            type: 'link',
            url: 'https://o0y36dyw6y5.feishu.cn/docx/WATsdiYCWoRCyyxvj0Qc0wiLn0f'
          },
          {
            name: 'AI美女号抖音爆粉——一个视频破万粉【蓝海市场】',
            type: 'link',
            url: 'https://o0y36dyw6y5.feishu.cn/docx/BB6ldNIOsoEgVixsZnQc1gMTn3e'
          },
          {
            name: '拆解 月入过万的小红书 头像壁纸玩法 与制作',
            type: 'link',
            url: 'https://s0xpyu2kpl6.feishu.cn/docx/MNXhdknUGoyRAJxoaeNcofGmnUh'
          },
          {
            name: '小红书资料号 新玩法 深度运营月入5w+实战分享',
            type: 'link',
            url: 'https://d16rg8unadx.feishu.cn/docx/LQGEdxUJookxbSxnFDYcgIScnwd'
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
          },
          {
            name: 'AI 生成PPT',
            type: 'link',
            url: 'https://design.meitu.com/ppt/'
          },
          {
            name: 'AI 生成LOGO',
            type: 'link',
            url: 'https://www.logosc.cn/?coupon=hi-uli'
          },
          {
            name: '腾讯AI 数字人 007打工仔',
            type: 'link',
            url: 'https://zenvideo.qq.com/'
          },
          {
            name: 'AI 生成营销文案',
            type: 'link',
            url: 'https://copyai.cn/'
          },
          {
            name: 'AI 一键抠图',
            type: 'link',
            url: 'https://magicstudio.com/zh/magiceraser'
          },
          {
            name: 'AI 去除背景',
            type: 'link',
            url: 'https://www.remove.bg/zh'
          },
          {
            name: 'AI 文生图优秀案例',
            type: 'link',
            url: 'https://playgroundai.com'
          },

          {
            name: '创建AI 应用',
            type: 'link',
            url: 'http://www.chatbox.cool/'
          },
          {
            name: 'AI 艺术馆',
            type: 'link',
            url: 'https://arthub.ai/'
          },
          {
            name: 'AI 免费生成文字logo',
            type: 'link',
            url: 'https://www.uugai.com/'
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
          },
          {
            name: '胎教级音视频教程',
            type: 'link',
            url: 'https://zhuanlan.zhihu.com/p/630115251'
          },
          {
            name: 'SD-prompt生成器+词典',
            type: 'link',
            url: 'https://moonvy.com/apps/ops/'
          },
          {
            name: 'ai作品搜索引擎（灵感）',
            type: 'link',
            url: 'https://search.krea.ai/'
          },
          {
            name: 'prompt搜索引擎',
            type: 'link',
            url: 'https://lexica.art/'
          },
          {
            name: 'SD文生图搭建教程',
            type: 'link',
            url: 'https://zhuanlan.zhihu.com/p/617997179'
          },
          {
            name: '国内midjouryery',
            type: 'link',
            url: 'https://rightbrain.art/'
          },
          {
            name: 'AIGC魔导书',
            type: 'link',
            url: 'https://www.wujieai.com/tag-generator'
          },
          {
            name: 'Midjourney教程：超详细Ai绘画新手入门攻略',
            type: 'link',
            url: 'https://zhuanlan.zhihu.com/p/611864651'
          },
          {
            name: 'Midjourney 知识库-入坑-进阶-实战',
            type: 'link',
            url: 'https://tob-design.yuque.com/kxcufk/mj'
          },
          {
            name: 'Stable Diffusion 知识库-入坑-进阶-实战',
            type: 'link',
            url: 'https://tob-design.yuque.com/kxcufk/sd'
          },
          {
            name: '拍张证件照200元？Midjourney免费给你做一张',
            type: 'link',
            url: 'https://xikr8g3owj.feishu.cn/docx/VYXOdUvGooF2MTxnN2cc7a4Mnuh'
          },
          {
            name: '0基础小白如何 使用chatGPT 整活 小红书90分 文案 ？',
            type: 'link',
            url: 'https://qdrlbziuml.feishu.cn/docx/SPXXd89EFoyWMixuvgOcRnu7nof'
          },
          {
            name: '瞬息宇宙 平行宇宙终极教程',
            type: 'link',
            url: 'https://ry5hwpuf7b.feishu.cn/docx/Lfjedtd4QoCkBhxkgTfcBsG1np0'
          },
          {
            name: '瞬息宇宙 穿越之旅终极教程',
            type: 'link',
            url: 'https://ry5hwpuf7b.feishu.cn/docx/WbFVdvGkAoo38ZxDumwclWEynRg'
          },
          {
            name: '免费开源的直播推流 录屏软件 全平台支持 windows macos linux',
            type: 'link',
            url: 'https://obsproject.com/'
          },
          {
            name: '一款全能的下载工具 兼容 windows macos Linux 支持下载 HTTP、FTP、BT、磁力链接等资源',
            type: 'link',
            url: 'https://motrix.app/zh-CN'
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
    category: '日常开发相关',
    type: 'select',
    data: [
      {
        title: '常见问题解决方案',
        list: [
          {
            name: '一文教你实现PDF 预览和下载',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/vQYWEmcBbCvGTe8Gcsfc1Q'
          },
          {
            name: '可视化大屏：autofit.js 一行搞定自适应',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/qWIeDH-QVBqPe91sz5WRWg'
          },
          {
            name: '提升代码可读性，减少 if-else 的几个小技巧',
            type: 'link',
            url: 'https://mp.weixin.qq.com/s/zpmXYZ-eoUz1A4Glm72rlA'
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
