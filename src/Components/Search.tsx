import { useGameSearch } from '../Services/GlobalApi';
import React, { useState, useContext, useMemo, useEffect } from 'react';
import { GameContext } from "../Context/GameContext";
import { useDebounce } from '../utils/useDebounce';
import { TbFidgetSpinner } from "react-icons/tb";
import { useInView } from 'react-intersection-observer';
import SearchSkeleton from "../Skeleton/SearchSkeleton";
import PlatformIcon, { IconListKeys } from "./PlatformIcon";

const Search = () => {
  const { searchInput } = useContext(GameContext) || { searchInput: '' }; // Provide default value
  const [searchActive, setSearchActive] = useState("");
  const { ref, inView} = useInView();
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGameSearch({search: debouncedSearchInput });

  useEffect(() => {
    if (debouncedSearchInput) {
      fetchNextPage();
    }
  }, [debouncedSearchInput]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const filteredSearch = useMemo(() => {
    if (!data || !data.pages || !data.pages.length) {
      return [];
    } else {
      const allGames = data.pages.flatMap(page => page.data);
      return allGames.filter(game => game.instance === "game");
    }
  }, [data]);

  useEffect(() => {
    setSearchActive(debouncedSearchInput.length === 0 ? "hidden" : "");
  }, [debouncedSearchInput]);

  return (
    <div className={`p-4 ${searchActive}`}>
      <h2 className="text-3xl font-bold p-3 mb-3 dark:text-white">Search Results</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredSearch.length === 0 && !isFetchingNextPage && (
          <SearchSkeleton />
        )}
        {filteredSearch.map((game, index) => (
          <div key={index} className="bg-slate-300 p-3 pb-20 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
            <img className="w-full h-[80%] rounded-xl object-cover" src={game.background_image} alt={game.name} width={1080} />
            <div className="flex gap-1 p-2 mt-2">
                  {game.parent_platforms.map((icon) => (
                    <PlatformIcon platform={icon.platform.slug as IconListKeys} />
                  ))}
                </div>
            <h2 className="text-[20px] dark:text-white font-bold p-2">{game.name}<span className="p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium">{game.metacritic}</span></h2>
            <h2 className="text-gray-500 p-1">⭐{game.rating} 💬{game.reviews_count}  🔥{game.suggestions_count}</h2>
          </div>
        ))}
        <div ref={ref} className="mt-3 flex gap-1">
          {isFetchingNextPage && (
            <>
              <TbFidgetSpinner className="animate-spin h-8 w-8 mr-3 dark:text-white" viewBox="0 0 34 34" />
              <span className="text-xl dark:text-white">Loading.....</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;