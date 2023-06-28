import { useIntersectionObserver } from "@vueuse/core";
import { ref ,reactive} from "vue";

/**
 * 返回一个响应式对象，用于实现按需加载。
 * @param apiFn 当目标元素进入视口时要调用的函数。
 * @returns 包含目标元素、相交元素列表和停止函数的对象。
 */
export const useObserver = (apiFn?: () => void) => {
    // 创建一个 ref 以绑定模板中的目标元素（DOM 节点或组件）
    const target = ref(null);
    const state = reactive({
        isIntersectingList :new Set()
    })
    const { stop } = useIntersectionObserver(target, (entry) => {
      // 遍历每个观察到的 entry
      for (let i = 0; i < entry.length; i++) {
        // 检查 entry 是否相交
        if (entry[i].isIntersecting) {
          // 将相交元素的索引添加到列表中
          state.isIntersectingList.add(+entry[i].target.getAttribute('data-index'));
        }
      }
    });
  
    // 返回目标元素、相交元素列表和停止函数
    return { target, state, stop };
  };
  

