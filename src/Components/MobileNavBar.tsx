import React, { useState, useContext } from 'react';
import { IoMenu, IoClose } from "react-icons/io5";
import { GameContext } from "../Context/GameContext";
import { useNavigate } from 'react-router-dom';

const MobileNavBar = ({ className }) => {
  const [nav, setNav] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const {
    setGenreList,
    setGameListByGenreId,
    setGameHeaderByGenreName,
    setGenreId,
    genreList
  } = useContext(GameContext) || {}; // Provide default values
  
  const handleGenreClick = (index: number, genreId: string, genreName: string) => {
    setActive(index);
    if (setGenreId && setGameHeaderByGenreName) {
      setGenreId(genreId);
      setGameHeaderByGenreName(genreName);
    }
    navigate(`/genre/${genreId}`);
  };

  return (
    <div className={`relative ${className}`} onClick={() => { setNav(!nav); }}>
      {nav ? <IoClose className="text-3xl transition duration-1000 ease-in-out dark:text-white" /> : <IoMenu className="text-3xl transition duration-1000 ease-in-out dark:text-white" />}
      {nav &&
        <div className="bg-blue-600 absolute w-[190px] h-[410px] rounded-lg p-2 z-10 top-10 ease-in-out transition-all duration-500 overflow-auto">
          <div>
            {genreList && genreList.map((item, index) => (
              <div key={index} className={`flex gap-2 items-center rounded-xl p-1 mb-4  text-black dark:text-white hover:scale-110 transition-all duration-300 cursor-pointer ${active === index ? "bg-slate-300 dark:bg-gray-700" : null}`} onClick={() => handleGenreClick(index, item.id, item.name)}>
                <img className="h-11 w-11 object-cover rounded-xl" src={item.image_background} alt={item.name} />
                <div className="flex items-center">
                  <h2 className="font-bold text-sm sm:text-base">{item.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
}

export default MobileNavBar;
