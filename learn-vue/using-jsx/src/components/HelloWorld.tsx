import { h, ref } from 'vue'

type Props = {
  message: string
}

export default {
  props: ["message"],
  setup(props: Props) {
    const count = ref(0)

    return () => <>
      <h1>{props.message}</h1>
      <div>
        <button onClick={() => count.value++}>
          count is {count.value}
        </button>
      </div>
    </>
  }
}
