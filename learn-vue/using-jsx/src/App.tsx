// import HelloWorld from './components/HelloWorld.vue'
// import HelloWorld from './components/HelloWorld.ts'
import HelloWorld from './components/HelloWorld.tsx'
// import { Hi } from './components/Hi.ts'
import { Hi } from './components/Hi.tsx'

export default function () {
  return (
    <>
      <HelloWorld message="hello world" />
      <Hi message="hihi">hahaha</Hi>
    </>
  )
}
