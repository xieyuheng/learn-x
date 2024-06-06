import { h, ref } from 'vue'

type Props = {
  message: string
}

const count = ref(0)

export function Hi(props: Props) {
  return [
    h('h2', props.message),
    h('div', [
      h('button', { onClick: () => count.value++ }, ['count is ', count.value]),
    ]),
  ]
}
