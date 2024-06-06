import { reactive } from 'vue'
import { HelloWorld } from './components/HelloWorld.tsx'
import { Hi } from './components/Hi.tsx'

export default function () {
  return (
    <>
      <HelloWorld message="hello world 1" state={reactive({ count: 0 })} />
      <HelloWorld message="hello world 2" state={reactive({ count: 0 })} />
      <Hi message="hi 1">
        <div>hahaha 1</div>
      </Hi>
      <Hi message="hi 2">
        <div>hahaha 2</div>
      </Hi>
    </>
  )
}
