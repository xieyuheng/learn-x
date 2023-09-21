import { reactive, watch, watchEffect } from "@vue/runtime-core"
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

function stateStartCounting(state: State): void {
  // Mimic user events.
  watch(
    () => state.count,
    async () => {
      await wait(100)
      state.count++
    },
    { immediate: true },
  )

  // Mimic DOM rendering.
  watchEffect(() => {
    console.log({
      "state.count": state.count,
      "state.add1": state.add1,
      "state.add(10)": state.add(10),
    })
  })
}

const state = reactive(createState())

stateStartCounting(state)
