import { reactive } from "@vue/reactivity"

export function reactiveState() {
  const state = reactive({ count: 0 })

  return state
}
