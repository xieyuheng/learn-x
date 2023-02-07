import { ref, watch } from "@vue/runtime-core"

const x = ref(0)
const y = ref(0)

watch(
  x,
  (newX) => {
    console.log(`x is ${newX}`)
    setTimeout(() => {
      x.value++
      y.value--
    }, 1000)
  },
  { immediate: true },
)

watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  },
  { immediate: true },
)
