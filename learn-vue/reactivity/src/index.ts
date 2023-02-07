import { effect, reactive } from "@vue/reactivity"

export function reactiveState() {
  const state = reactive({ count: 0 })

  effect

  return { state }
}
