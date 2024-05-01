import  React from "react";
import Logo from "../assets/images/logo.png"
import { FaSearch } from "react-icons"

function Header(){
  return (
    <>
    <div>
      <img src={logo} className='w-10 h-5'/>
    </div>
    <div>
      <FaSearch />
      <input className="rounded"/>
    </div>
    </>
    )
}
export default Header
