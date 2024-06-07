import { test } from "node:test"
import { reactive, watchEffect } from "./reactive.js"
import assert from "node:assert"

test('reactive', () => {
  const state = reactive({
    x: 1,
    y: 2,
    user: reactive({
      name: "xyh",
      age: 123,
    }),
  })

  watchEffect(() => {
    console.log(state.x)
    console.log(state.y)
    console.log(state.user.name)
    console.log()
  })

  state.x = 100
  state.y = 200
})
