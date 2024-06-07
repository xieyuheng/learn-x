import { test } from "node:test"
import { reactive, ref, watchEffect } from "./reactive.js"
import assert from "node:assert"

test('reactive', () => {
  const count = ref(0)

  watchEffect(() => {
    console.log("count:", count.value)
    console.log()
  })

  count.value++
  count.value++

  const state = reactive({
    x: 1,
    y: 2,
    user: reactive({
      name: "xyh",
      age: 123,
    }),
  })

  watchEffect(() => {
    console.log("x:", state.x)
    console.log("y:", state.y)
    console.log("user.name:", state.user.name)
    console.log()
  })

  state.x = 100
  state.y = 200
  state.user.name = 'xieyuheng'
})
