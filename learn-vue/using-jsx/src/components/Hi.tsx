import { ref, type SetupContext, type SlotsType } from 'vue'

type Props = {
  message: string
}

type Events = {}

type Slots = SlotsType<{
  default: void
}>

const count = ref(0)

export function Hi(props: Props, context: SetupContext<Events, Slots>) {
  return (
    <>
      <h2>{props.message}</h2>

      <div>
        <button onClick={() => count.value++}>count is {count.value}</button>
      </div>

      <div>{context.slots.default()}</div>
    </>
  )
}
