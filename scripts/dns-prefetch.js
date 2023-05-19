const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')
const { glob } = require('glob')
const urlRegex = require('url-regex')

//获取外部链接的正则表达式

const urlPattern = /(https?:\/\/)?(www\.|m\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/i
const urls = new Set()
//遍历dist目录下面的所有html文件
async function searchDomain() {
  const files = await glob('dist/**/*.{html,css,js}')
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf-8')
    const matches = source.match(urlRegex({ strict: true }))
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern)
        if (match && match[0]) {
          urls.add(match[0])
        }
      })
    }
  }
}

async function insertLinks() {
  const files = await glob('dist/**/*.html')
  const links = [...urls].map((url) => `<link rel="dns-prefetch" href="${url}" />`).join('\n')
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8')
    const root = parse(html)
    const head = root.querySelector('head')
    head.insertAdjacentHTML('afterbegin', links)
    fs.writeFileSync(file, root.toString())
  }
}

async function main() {
  await searchDomain()
  await insertLinks()
}
main()
