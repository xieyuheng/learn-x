import { h, ref } from 'vue'

type Props = {
  message: string
}

export default {
  props: ["message"],
  setup(props: Props) {
    const count = ref(0)

    return () => <div>hello</div>
  }
}
