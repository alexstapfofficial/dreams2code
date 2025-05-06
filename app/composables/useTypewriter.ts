import { onMounted, nextTick } from 'vue'

export function useTypewriter(
  container: Ref<HTMLElement | null>,
  selector: string,
  speed = 75
) {
  onMounted(async () => {
    await nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0)) // micro delay

    const run = (el: HTMLElement) => {
      const full = el.innerHTML
      el.innerHTML = ''
      let i = 0

      const type = () => {
        el.innerHTML = full.slice(0, i + 1)
        i++
        if (i < full.length) setTimeout(type, speed)
      }

      type()
    }

    const wrapper = container.value
    if (!wrapper) return

    const immediateTarget = wrapper.querySelector(selector)
    if (immediateTarget) {
      run(immediateTarget as HTMLElement)
    } else {
      // fallback: DOM noch nicht bereit – beobachte bis h1 da ist
      const observer = new MutationObserver(() => {
        const found = wrapper.querySelector(selector)
        if (found) {
          observer.disconnect()
          run(found as HTMLElement)
        }
      })
      observer.observe(wrapper, { childList: true, subtree: true })
    }
  })
}
