import React from 'react';
import { getGameList } from "../Services/GlobalApi";
import { useQuery } from 'react-query';
import PopularGameSkeleton from "../Skeleton/PopularGameSkeleton";
import PlatformIcon from "./PlatformIcon";
import { Link } from "react-router-dom";

function PopularGame() {
  const { isLoading: isLoadingPopularGame, data: popularGames, isError: isErrorPopularGame } = useQuery("gameList", getGameList, {
    staleTime: 24 * 60 * 60 * 1000,
  });
  
  if (isLoadingPopularGame || !popularGames) {
    return <PopularGameSkeleton />; // Render loading indicator while data is loading
  }

  if (isErrorPopularGame) {
    return <div>Error fetching game list!</div>; // Render error message if an error occurs
  }

  return (
    <div className='p-5 mt-9 hidden md:block'>
      <h2 className='text-4xl font-bold dark:text-white p-3'>Popular Games</h2>
      <div className='grid grid-cols-2 gap-6 p-3 h-full lg:grid-cols-4 '>
        {popularGames.map((item, index) => index < 4 && (
          <Link to={`/game/${item.id}`} key={item.id}>
            <div className="bg-slate-300 p-3 pb-24 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
              <img className="w-full h-4/5 rounded-xl object-cover" src={item.background_image} alt={item.name} width={1080} />
              <div className="flex gap-1 p-2 mt-2">
                {item.parent_platforms.map((icon) => (
                  <PlatformIcon key={icon.platform.id} platforms={[icon.platform]} /> 
                ))}
              </div>
              <h2 className="text-[20px] dark:text-white font-bold p-2">{item.name}<span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span></h2>
              <h2 className='text-gray-500 p-1'>⭐{item.rating} 💬{item.reviews_count} 🔥{item.suggestions_count}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularGame;