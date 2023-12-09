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
