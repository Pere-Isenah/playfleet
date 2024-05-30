import { useState, useEffect } from 'react'
import './App.css'
import Header from "./Components/Header.tsx"
import Home from "./Pages/Home.tsx"
import { GameProvider } from "./Context/GameContext"
import { ThemeContext } from './Context/ThemeContext'
import ErrorBoundary from "./Components/ErrorBoundary.tsx"
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from "@clerk/themes";
import { Outlet, useMatch } from "react-router-dom";

function App() {
  // Import your publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
  }

  const [theme, setTheme] = useState("light")
  const match = useMatch("/");

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} ${theme == 'dark' ? 'bg-[#121212]' : null}`}>
        <GameProvider>
          <ErrorBoundary>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{ baseTheme: dark }}>
              <Header />
              {match && <Home />}
              <Outlet />
            </ClerkProvider>
          </ErrorBoundary>
        </GameProvider>
      </div>
    </ThemeContext.Provider>
  )
}

export default App