import type{ DirectiveBinding, ObjectDirective } from 'vue';

export function createIntersectionObserverDirective(): ObjectDirective {
  let intersectionObserver: IntersectionObserver | null = null;
  let handleScroll:any = null
  const intersectionObserverDirective: ObjectDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
       handleScroll = () => {
        const rect = el.getBoundingClientRect();
        const isElementVisible = rect.top < window.innerHeight && rect.bottom >= 0;
           
        if (isElementVisible) {
          // 当元素在视口内且没有滚动时触发动画
          el.style.transition = `transform 1s ${binding.value.transform}`;
          el.style.transform = `translateY(-${binding.value.translateY}px)`;
        //   el.style.opacity = `${binding.value.opacity}`
        } else {
            console.log('====================================');
            console.log(isElementVisible);
            console.log('====================================');
          // 当元素离开视口或滚动时重置动画
          el.style.transition = '';
          el.style.transform = `translateY(-${binding.value.backTranslateY}px)`;
          el.style.opacity='1'
        }
      };

      // 创建 Intersection Observer 实例
      intersectionObserver = new IntersectionObserver(handleScroll);

      // 监听元素
      intersectionObserver.observe(el);

      // 监听滚动事件
    //   window.addEventListener('scroll', handleScroll);
    },
    unmounted() {
      // 清理 Intersection Observer 实例和滚动事件监听器
      if (intersectionObserver) {
        intersectionObserver.disconnect();
        intersectionObserver = null;
      }
    //   window.removeEventListener('scroll', handleScroll);
    }
  };

  return intersectionObserverDirective;
}
