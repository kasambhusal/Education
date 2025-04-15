import "./App.css"
import { BrowserRouter } from "react-router-dom"
import PageUser from "./Components/Main Components/PageUser"
import { ThemeProvider } from "./Components/Context/ThemeContext"
import { UserProvider } from "./Components/Context/UserContext"
import { HelmetProvider } from "react-helmet-async"

function App() {
  // Create a fresh helmetContext for each app instance
  const helmetContext = {}

  return (
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <ThemeProvider>
          <UserProvider>
            <PageUser />
          </UserProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
