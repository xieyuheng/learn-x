import { ref } from 'vue'

type Props = {
  message: string
}

const count = ref(0)

export function HelloWorld(props: Props) {
  return (
    <>
      <h1>{props.message}</h1>
      <div>
        <button onClick={() => count.value++}>count is {count.value}</button>
      </div>
    </>
  )
}
