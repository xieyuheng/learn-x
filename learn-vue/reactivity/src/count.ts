import { reactive, watch } from "@vue/runtime-core"
import { wait } from "./utils/wait"

interface State {
  count: number
  add1: number
  add: (n: number) => number
}

function createState(): State {
  return {
    count: 0,
    get add1() {
      return this.count + 1
    },
    add(n: number) {
      return this.count + n
    },
  }
}

function reactiveState(): State {
  const state = reactive(createState())
  stateStartCounting(state)
  return state
}

function stateStartCounting(state: State): void {
  watch(
    () => state.count,
    async (to, from) => {
      await wait(100)
      console.log({
        "state.count": state.count,
        "state.add1": state.add1,
        "state.add(10)": state.add(10),
      })
      state.count++
    },
    { immediate: true },
  )
}

const state = reactiveState()
