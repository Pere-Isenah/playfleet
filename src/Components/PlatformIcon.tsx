import React from "react";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
} from "react-icons/fa";
import { BsNintendoSwitch, BsGlobe } from "react-icons/bs";
import { MdPhoneIphone } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";

const iconList = {
  pc: FaWindows,
  playstation: FaPlaystation,
  xbox: FaXbox,
  mac: FaApple,
  linux: FaLinux,
  android: IoLogoAndroid,
  nintendo: BsNintendoSwitch,
  ios: MdPhoneIphone,
  web: BsGlobe,
};

export type IconListKeys = keyof typeof iconList;

interface Props {
  platform: IconListKeys;
}
const renderIcon = (slug: IconListKeys) => {
  const icon = iconList[slug];

  return icon ? React.createElement(icon) : null;
};

const PlatformIcon = ({ platform }: Props) => {
  return (
    <div>
      <div className="text-xl dark:text-white" key={platform}>
        {renderIcon(platform)}
      </div>
    </div>
  );
};

export default PlatformIcon;
