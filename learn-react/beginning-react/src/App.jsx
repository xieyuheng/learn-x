import { useState } from "react"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  function decrement() {
    setCount((count) => count - 1)
  }
  function increment() {
    setCount((count) => count + 1)
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border-2 p-2">
        <span className="p-2">{count}</span>
        <button onClick={decrement} className="border-2 bg-gray-100 p-2">-</button>
        <button onClick={increment} className="border-2 bg-gray-100 p-2">+</button>
      </div>
    </div>
  )
}

export default App
