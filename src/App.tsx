import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white text-3xl font-bold">
      Tailwind funciona 🚀
    </div>
  )
}

export default App
