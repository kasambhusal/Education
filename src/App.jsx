import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainNav from './Components/Main Components/MainNav'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainNav />
    </>
  )
}

export default App
