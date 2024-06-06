type Props = {
  state: { count: number }
  message: string
}

export function HelloWorld(props: Props) {
  return (
    <>
      <h1>{props.message}</h1>
      <div>
        <button onClick={() => props.state.count++}>
          count is {props.state.count}
        </button>
      </div>
    </>
  )
}
