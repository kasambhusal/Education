import "./App.css"
import { BrowserRouter } from "react-router-dom"
import PageUser from "./Components/Main Components/PageUser"
import { ThemeProvider } from "./Components/Context/ThemeContext"
import { UserProvider } from "./Components/Context/UserContext"
import { HelmetProvider } from "react-helmet-async"
import MetaTagCleaner from "./Components/OG Components/MetaTagCleaner"

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider>
          <UserProvider>
            <MetaTagCleaner />
            <PageUser />
          </UserProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  )
}

export default App
