import { useState } from 'react'
import './App.css'
import Header from "./Components/Header.tsx"
import Home from "./Pages/Home.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
      <h1>huhh</h1>
      <Header />
      <Home />
      </div>
  )
}

export default App
