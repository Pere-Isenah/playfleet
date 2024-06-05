import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getGenreList } from '../Services/GlobalApi';
import GenreSkeleton from '../Skeleton/GenreSkeleton';
import { GameContext } from '../Context/GameContext';

const GenreList = () => {
  const {
  setGenreList,
  setGenreId,
  setGameHeaderByGenreName,
} = useContext(GameContext) || {};

  const navigate = useNavigate();
  const [active, setActive] = useState<number>();

  const { isLoading: isLoadingGenreList, data: genreList, isError: isErrorGenreList } = useQuery(
    'genreList',
    getGenreList,
    {
      staleTime: 24 * 60 * 60 * 1000,
    }
  );

setGenreList(genreList)
  if (isLoadingGenreList) {
    return <GenreSkeleton />; // Render loading indicator while data is loading
  }

  if (isErrorGenreList) {
    return <div>Error fetching genre list!</div>; // Render error message if an error occurs
  }

  const handleGenreClick = (index: number, genreId: string, genreName: string) => {
    setActive(index);
    if (setGenreId && setGameHeaderByGenreName) {
  setGenreId(genreId);
  setGameHeaderByGenreName(genreName);
}
    navigate(`/genre/${genreId}`);
  };

  return (
    <div className="p-3 pr-4 ">
    
      <h1 className="text-2xl font-bold mb-4 border-b-2 border-slate-300 sticky top-[75px] bg-white dark:bg-[#121212] dark:text-white border-b-2 border-slate-200">
        Genre
      </h1>
      <div>
        {genreList.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center rounded-xl p-2 mb-4 text-black dark:text-white hover:scale-110 transition-all duration-300 cursor-pointer ${
              active === index ? 'bg-slate-300 dark:bg-gray-700' : null
            }`}
            onClick={() => handleGenreClick(index, item.id, item.name)}
          >
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