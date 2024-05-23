import React, { useRef, useEffect, useContext } from 'react';
import { useGameList } from '../Services/GlobalApi'; // Assuming you've defined useGameList in GlobalApi.js
import PopularGameSkeleton from '../Skeleton/PopularGameSkeleton';
import { GameContext } from '../Context/GameContext';
import { useInfiniteQuery } from 'react-query'; 

function PopularGame() {
  const { data: popularGames, isLoading: isLoadingPopularGame, isError: isErrorPopularGame, fetchNextPage, hasNextPage, isFetchingNextPage } = useGameList();

  const { setGameList } = useContext(GameContext);

  const bottomBoundaryRef = useRef(null);

  // Assuming setGameList is used to set the game list in the context
  if (popularGames) {
    setGameList(popularGames);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (bottomBoundaryRef.current) {
        observer.unobserve(bottomBoundaryRef.current);
      }
    };
  }, [bottomBoundaryRef, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoadingPopularGame || (!popularGames && !isErrorPopularGame)) {
    return <PopularGameSkeleton />; // Render skeleton or loading indicator while data is loading or no data is available yet
  }

  if (isErrorPopularGame) {
    return <div>Error fetching game list!</div>; // Render error message if an error occurs
  }

  console.log(popularGames); // Log popularGames instead of gameList

  return (
    <div className='p-5 mt-9 hidden md:block'>
      <h2 className='text-4xl font-bold dark:text-white p-3'>Popular Games</h2>
      <div className='grid grid-cols-2 gap-6 p-3 h-full lg:grid-cols-4 '>
        {popularGames.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((game, index) => (
              index < 4 && (
                <div key={index} className='h-full pb-14 p-4 rounded-lg bg-slate-400 dark:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
                  <img width={1080} className=" h-[80%] w-full rounded-t-lg object-cover" src={game.background_image} alt={game.name}/>
                  <h2 className="font-bold text-lg text-center p-3 md:text-base  dark:text-white">{game.name}</h2>
                  <div className="grid grid-cols-3 gap-1">
                    <h4 className="dark:text-white text-xs"><span className="font-bold text-sm  inline-block">Rating:</span> {game.rating}</h4>
                    <h4 className="dark:text-white text-xs"><span className="font-bold text-sm dark:text-white inline-block">Reviews:</span> {game.reviews_count}</h4>
                    <p className="dark:text-white text-xs"><span className="font-bold dark:text-white inline-block text-sm">Suggestion:</span> {game.suggestions_count}</p>
                  </div>
                </div>
              )
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={bottomBoundaryRef}></div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </div>
  );
}

export default PopularGame;