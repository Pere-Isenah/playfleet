import React, { useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useGamesByGenreId } from "../Services/GlobalApi";
import { GameContext } from "../Context/GameContext";
import { ImSpinner4 } from "react-icons/im";
import PlatformIcon from "./PlatformIcon";
import { FaArrowLeft } from "react-icons/fa"
import GameListSkeleton from "../Skeleton/GameListSkeleton";

const GameList = () => {
  const { gameHeaderByGenreName } = useContext(GameContext) || {}; // Provide default values
  const { genre, genreId } = useParams();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGamesByGenreId({ genreId: genreId });
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (!data || !data.pages || !data.pages.length) {
    return <GameListSkeleton /> // or you can return a loading indicator or any placeholder
  }

  return (
    <div className="p-4">
      <div className="sticky top-[110px] bg-white dark:bg-[#121212]">
        <div className="pl-4 pt-4">
          <FaArrowLeft onClick={() => navigate(-1)} className="text-lg dark:text-white" />
        </div>
        <h2 className="text-3xl font-bold ml-1 p-3 mb-3 dark:text-white">{gameHeaderByGenreName} Games</h2>
      </div>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.data.map((item, itemIndex) => (
              <Link to={`/game/${item.id}`} key={item.id}>
                <div className="bg-slate-300 p-3 pb-24 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
                  <img className="w-full h-4/5 rounded-xl object-cover" src={item.background_image} alt={item.name} width={1080} />
                  <div className="flex gap-1 p-2 mt-2">
                    {item.parent_platforms.map((icon, index) => (
                      <PlatformIcon platforms={[icon.platform]} key={index} />
                    ))}
                  </div>
                  <h2 className="text-[20px] dark:text-white font-bold p-2">{item.name}<span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span></h2>
                  <h2 className='text-gray-500 p-1'>⭐{item.rating} 💬{item.reviews_count} 🔥{item.suggestions_count}</h2>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={ref} className="mt-3 flex gap-1">
        {isFetchingNextPage && (
          <>
            <ImSpinner4 className="animate-spin h-8 w-8 mr-3 dark:text-white" viewBox="0 0 34 34" />
            <span className="text-xl dark:text-white">Loading.....</span>
          </>
        )}
      </div>
    </div>
  );
}

export default GameList;