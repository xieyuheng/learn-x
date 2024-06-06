import { h, ref } from 'vue'

type Props = {
  message: string
}

export default {
  props: ['message'],

  setup(props: Props) {
    const count = ref(0)

    return () => [
      h('h1', props.message),
      h('div', [
        h('button', { onClick: () => count.value++ }, [
          'count is ',
          count.value,
        ]),
      ]),
    ]
  },
}
