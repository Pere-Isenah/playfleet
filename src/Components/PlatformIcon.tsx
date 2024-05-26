import React from 'react'
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux } from "react-icons/fa";
import { BsNintendoSwitch, BsGlobe} from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";
import { IconType } from "react-icons/lib";

const PlatformIcon = ({ platforms }: Props) => {
  const IconList :{[key: string]: IconType} ={
    pc: <FaWindows />,
    playstation: <FaPlaystation />,
    xbox: <FaXbox />,
    mac: <FaApple />,
    linux: <FaLinux />,
    android: <IoLogoAndroid />,
    nintendo: <BsNintendoSwitch />,
    ios: <MdPhoneIphone />,
    web: <BsGlobe />,
  }
  return (
    <div>
      {platforms.map((platform)=>(
      <div className="text-xl dark:text-white">
        {IconList[platform.slug]}
      </div>
    ))}
    </div>
  )
}

export default PlatformIcon