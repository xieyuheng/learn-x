import { reactive, watch } from "@vue/runtime-core"

interface State {
  x: null | undefined
  y: null | undefined
}

function createState(): State {
  return {
    x: null,
    y: undefined,
  }
}

function reactiveState(): State {
  const state = reactive(createState())
  stateReportX(state)
  stateReportY(state)
  return state
}

function stateReportX(state: State): void {
  watch(
    () => state.x,
    (to, from) => {
      console.log({ "state.x": state.x })
    },
    { immediate: true },
  )
}

function stateReportY(state: State): void {
  watch(
    () => state.y,
    (to, from) => {
      console.log({ "state.y": state.y })
    },
    { immediate: true },
  )
}

const state = reactiveState()

state.x = undefined
state.y = null
