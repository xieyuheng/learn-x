import { ref } from 'vue'

type Props = {
  message: string
}

const count = ref(0)

export function Hi(props: Props) {
  return (
    <>
      <h2>{props.message}</h2>
      <div>
        <button onClick={() => count.value++}>count is {count.value}</button>
      </div>
    </>
  )
}
