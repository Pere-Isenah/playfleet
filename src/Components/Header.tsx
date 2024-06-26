import React, { useState, useContext, useEffect } from "react";
import Logo from "../assets/images/logo.png";
import { FaSearch, FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "../Context/ThemeContext";
import { GameContext } from "../Context/GameContext";
import "../index.css";
import MobileNavBar from "./MobileNavBar";
import { Link } from "react-router-dom";

function Header() {
  const [toggle, setToggle] = useState(false);
  const themeContext = useContext(ThemeContext) || {}; // Provide default value
  const gameContext = useContext(GameContext) || {}; // Provide default value

  const { theme, setTheme } = themeContext as { theme: string, setTheme: (theme: string) => void }; // Adjust typings
  const { searchInput, setSearchInput } = gameContext as { searchInput: string, setSearchInput: (input: string) => void }; // Adjust typings

  useEffect(() => {
    console.log(searchInput);
  }, [searchInput]); 

  return (
    <>
      <div className="flex items-center p-3 border-b-2 border-b-black dark:border-b-white sticky top-0 z-20 bg-white dark:bg-[#121212]">
      <MobileNavBar className="md:hidden"/>
      <Link to={"/"}>
      <h2 className="font-game font-bold text-base  md:text-3xl dark:text-white">PLAYFLEET</h2>
      </Link>
        <img src={Logo} className="w-8 h-8 md:w-20 h-20" alt="Logo" />
        <div className="flex p-1 bg-slate-300 rounded-full items-center mx-3 w-2/4 md:w-full lg:w-70 md:p-3">
          <FaSearch />
          <input placeholder="search game" className="bg-transparent outline-none px-3" onChange={e => setSearchInput(e.target.value)} value={searchInput} />
        </div>
        <div className="pr-2">
          {theme === "light" ? (
            <MdSunny
              className="text-4xl bg-slate-200 rounded-full p-2 cursor-pointer"
              onClick={() => {
                setTheme && setTheme("dark"); // Ensure setTheme exists before invoking
                localStorage.setItem("theme", "dark");
              }}
            />
          ) : (
            <FaMoon
              className="text-4xl bg-slate-200 rounded-full p-2 cursor-pointer"
              onClick={() => {
                setTheme && setTheme("light"); // Ensure setTheme exists before invoking
                localStorage.setItem("theme", "light");
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Header;