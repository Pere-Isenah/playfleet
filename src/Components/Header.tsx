import React, { useState, useContext } from "react";
import Logo from "../assets/images/logo.png";
import { FaSearch, FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "../Context/ThemeContext";
import "../index.css"
import MobileNavBar from "./MobileNavBar"

function Header() {
  const [toggle, setToggle] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="flex items-center p-3">
      <MobileNavBar className="md:hidden"/>
      <h2 className="font-game font-bold text-base  md:text-3xl dark:text-white">PLAYFLEET</h2>
        <img src={Logo} className="w-8 h-8 md:w-20 h-20" alt="Logo" />
        <div className="flex p-1 bg-slate-300 rounded-full items-center mx-3 w-2/4 md:w-full lg:w-70 md:p-3">
          <FaSearch />
          <input placeholder="search game" className="bg-transparent outline-none px-3" />
        </div>
        <div className="pr-2">
          {theme == "light" ? (
            <MdSunny
              className="text-4xl bg-slate-200 rounded-full p-2 cursor-pointer"
              onClick={() => {
                setTheme("dark");
                localStorage.setItem("theme", "dark");
              }}
            />
          ) : (
            <FaMoon
              className="text-4xl bg-slate-200 rounded-full p-2 cursor-pointer"
              onClick={() => {
                setTheme("light");
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