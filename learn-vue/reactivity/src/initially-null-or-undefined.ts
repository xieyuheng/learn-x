import { reactive, watch } from "@vue/runtime-core"
import { wait } from "./utils/wait"

type State = {
  x: null | undefined
  y: null | undefined
}

export function reactiveState() {
  const state = reactive<State>({
    x: null,
    y: undefined,
  })

  watch(
    () => state.x,
    () => {
      console.log({
        "state.x": state.x,
      })
    },
    { immediate: true },
  )

  watch(
    () => state.y,
    () => {
      console.log({
        "state.y": state.y,
      })
    },
    { immediate: true },
  )

  return state
}

const state = reactiveState()

state.x = undefined
state.y = null
