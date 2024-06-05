import { useState, useEffect } from "react";
import "./App.css";
import Header from "./Components/Header.tsx";

import { GameProvider } from "./Context/GameContext";
import { ThemeContext } from "./Context/ThemeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Outlet, useMatch } from "react-router-dom";

function App() {
  // Import your publishable key
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  const [theme, setTheme] = useState("light");
  const match = useMatch("/");

  useEffect(() => {
    // @ts-ignore
    setTheme(
      localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark",
    );
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme} ${theme == "dark" ? "bg-[#121212]" : null}`}>
        <GameProvider>
          <ErrorBoundary
            fallback={<h1 className="text-2xl">Something went wrong.</h1>}
          >
            <ClerkProvider
              publishableKey={PUBLISHABLE_KEY}
              appearance={{ baseTheme: dark }}
            >
              <Header />
              <Outlet />
            </ClerkProvider>
          </ErrorBoundary>
        </GameProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

