const DISTANCE = 100
const DURATION = 1000
const animationMap = new WeakMap<any>()
const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = animationMap.get(entry.target)
      animation?.play()
      ob.unobserve(entry.target)
    }
  }
})

function isBelowViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight
}

export default {
  mounted(el: HTMLElement, binding: any) {
    if (isBelowViewport(el)) {
      return
    }
    const animation = el.animate(
      [
        {
          transform: `translateY(${
            binding.value.translateY ? binding.value.translateY : DISTANCE
          }px)`,
          opacity: 0.5
        },
        {
          transform: 'translateY(0)',
          opacity: 1
        }
      ],
      {
        duration: binding.value.duration ? binding.value.duration : DURATION,
        easing: binding.value.easing ? binding.value.easing : 'ease'
      }
    )
    animation.pause()
    animationMap.set(el, animation)
    ob.observe(el)
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
  }
}
