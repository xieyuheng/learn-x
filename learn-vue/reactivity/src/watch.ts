import { reactive, watch } from "@vue/runtime-core"
import { wait } from "./utils/wait"

export function reactiveState() {
  const state = reactive({
    count: 0,
    get add1() {
      return this.count + 1
    },
    add(n: number) {
      return this.count + n
    },
  })

  watch(
    () => state.count,
    async () => {
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

  return state
}

const state = reactiveState()
