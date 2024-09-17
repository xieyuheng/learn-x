import { Show } from 'solid-js'
import { createMutable } from 'solid-js/store'

const aState = { count: 0 }

export default function App() {
  const state = createMutable(aState)

  return (
    <div>
      <h1 class="text-3xl font-bold text-red-500 underline">Hello world!</h1>
      <div>{state.count}</div>
      <button on:click={() => state.count++}>inc</button>
      <Show when={state.count > 3} fallback={<div>Loading...</div>}>
        <div>hi</div>
      </Show>
    </div>
  )
}
