import { reactive, watch } from "@vue/runtime-core"

interface State {
  x: number
  y: number
}

function createState(): State {
  return {
    x: 0,
    y: 0,
  }
}

function reactiveState(): State {
  const state = reactive(createState())
  stateReportX(state)
  stateReportSum(state)
  return state
}

function stateReportX(state: State): void {
  watch(
    () => state.x,
    (to, from) => {
      console.log(`x is ${to}`)
      setTimeout(() => {
        state.x++
        state.y--
      }, 1000)
    },
    { immediate: true },
  )
}

function stateReportSum(state: State): void {
  watch(
    () => state.x + state.y,
    (to, from) => {
      console.log(`sum of x + y is: ${to}`)
    },
    { immediate: true },
  )
}

const state = reactiveState()
