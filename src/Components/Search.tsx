import React, { useState, useContext, useMemo, useEffect } from 'react';
import { GameContext } from "../Context/GameContext";
import { useDebounce } from '../utils/useDebounce';
import { useGamesByGenreId } from '../Services/GlobalApi'; // Import the appropriate API hook

const Search = () => {
  const { searchInput, allGameList } = useContext(GameContext);
  const [searchActive, setSearchActive] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGamesByGenreId({ genreId: undefined }); // Fetch games by genre ID

  useEffect(() => {
    if (debouncedSearchInput) {
      fetchNextPage({ pageParam: 1, search: debouncedSearchInput }); // Fetch the first page of search results when debounced search input changes
    }
  }, [debouncedSearchInput]); // Re-fetch data when the debounced search input changes

  const filteredSearch = useMemo(() => {
    if (!data || !data.pages || !data.pages.length) {
      return []; // Return an empty array if no data is available
    }
    // Flatten the data from all pages into a single array
    
    const allGames = data.pages.flatMap(page => page.data);
    // Filter games based on search input
    return allGames.filter(game => game.name.toLowerCase().includes(debouncedSearchInput.toLowerCase()));
  }, [data, debouncedSearchInput]);

  useEffect(() => {
    setSearchActive(debouncedSearchInput.length === 0 ? "hidden" : "");
  }, [debouncedSearchInput]);

  return (
    <div className={`p-4 ${searchActive}`}>
      <h2 className="text-3xl font-bold p-3 mb-3 dark:text-white">Search Results</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {console.log("filter:",filteredSearch)}
        {filteredSearch.map((game, index) => (
          <div key={index} className="bg-slate-300 p-3 pb-9 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
            <img className="w-full h-[80%] rounded-xl object-cover" src={game.background_image} alt={game.name} width={1080} />
            <h2 className="text-[20px] dark:text-white font-bold p-2">{game.name}<span className="p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium">{game.metacritic}</span></h2>
            <h2 className="text-gray-500 p-1">⭐{game.rating} 💬{game.reviews_count}  🔥{game.suggestions_count}</h2>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}

export default Search;