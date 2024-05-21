import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getGameList } from "../Services/GlobalApi";
import GameBannerSkeleton from "../Skeleton/GameBannerSkeleton";

function GameBanner() {
  const { isLoading: isLoadingGameList, data: gameList, isError: isErrorGameList } = useQuery("gameList", getGameList, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex === 2 ? 0 : currentIndex + 1);
    }, 5000); // Change image every 2.5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, gameList]);

  if (isLoadingGameList || !gameList) {
    return <GameBannerSkeleton />; // Render loading indicator while data is loading
  }

  if (isErrorGameList) {
    return <div>Error fetching game list!</div>; // Render error message if an error occurs
  }
  return (
    <>
      {gameList.slice(0, 3).map((game, index) => (
        <div key={index} className={`relative p-4 mt-3 w-full  ${index === currentIndex ? 'block' : 'hidden'}`}>
          <div className="absolute bottom-0 bg-gradient-to-t w-[97.7%] from-slate-900 to-transparent pb-10 mb-3 px-3 rounded-b-lg">
            <h2 className='font-bold text-white text-5xl'>{game.name}</h2>
            <button className="bg-slate-400 p-3 mt-2 font-bold text-lg text-white rounded-xl dark:bg-gray-700">Get more</button>
          </div>
          <img className="h-96 w-full object-top object-cover rounded-xl" src={game.background_image} alt="Game Banner" />
        </div>
      ))}
    </>
  );
}

export default GameBanner;