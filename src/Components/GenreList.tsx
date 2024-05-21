import React, { useEffect, useState, useContext } from 'react';
import {getGenreList} from "../Services/GlobalApi";
import { GameContext } from "../Context/GameContext"; 
import { useQuery } from 'react-query';
import GenreSkeleton from "../Skeleton/GenreSkeleton";

const GenreList = () => {
  const {
    setGenreList,
    setGameListByGenreId,
    setGameHeaderByGenreName,
    setGenreId,
  } = useContext(GameContext); 

  const [active, setActive] = useState();
  
  const {isLoading: isLoadingGenreList, data: genreList, isError: isErrorGenreList} =useQuery("genreList", getGenreList, {
    staleTime: 24 * 60 * 60 * 1000, 
  })
  
if (isLoadingGenreList) {
    return <GenreSkeleton />; // Render loading indicator while data is loading
  }

  if (isErrorGenreList) {
    return <div>Error fetching genre list!</div>; // Render error message if an error occurs
  }
  


  return (
    <div className="p-3 pr-4">
      <h1 className='text-2xl font-bold mb-4  border-b-2 border-slate-300 dark:text-white border-b-2 border-slate-200'>Genre</h1>
      <div>
        {genreList.map((item, index) => (
          <div key={index} className={`flex gap-2 items-center rounded-xl p-2 mb-4  text-black dark:text-white hover:scale-110 transition-all duration-300 cursor-pointer ${active === index ? "bg-slate-300 dark:bg-gray-700" : null}`} onClick={() => { setActive(index); setGenreId(item.id); setGameHeaderByGenreName(item.name); }}>
            <img className="h-20 w-20 object-cover rounded-xl" src={item.image_background} alt={item.name} />
            <div className="flex items-center">
              <h2 className="font-bold text-lg sm:text-base">{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;