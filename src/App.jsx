import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainNav from './Components/Main Components/MainNav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Main Components/Home'
import Login from './Components/Main Components/Login'
import PageUser from './Components/Main Components/PageUser'
import { ThemeProvider } from './Components/Context/ThemeContext'

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <PageUser />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
