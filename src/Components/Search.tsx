import React, { useState, useContext, useMemo, useEffect } from 'react';
import { GameContext } from "../Context/GameContext";

const Search = () => {
  const { allGameList, searchInput } = useContext(GameContext);
  const [searchActive, setSearchActive] = useState("");

  const filteredSearch = useMemo(() => {
    if (!allGameList || !searchInput) {
      return []; // Return an empty array or handle the case when gameList or searchInput is undefined
    }
    return allGameList.filter(game => game.name.toLowerCase().includes(searchInput.toLowerCase()));
  }, [allGameList, searchInput]);
  
  useEffect(() => {
    setSearchActive(searchInput.length === 0 ? "hidden" : "");
  }, [searchInput]);

  console.log('Filtered Search Results:', filteredSearch);
  console.log('search input:', searchInput);
  console.log("game:", allGameList);

  return (
    <div className={`p-4 ${searchActive}`}>
      <h2 className="text-3xl font-bold p-3 mb-3 dark:text-white">Search Results</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredSearch.map((game, index) => (
          <div key={index} className="bg-slate-300 p-3 pb-9 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
            <img className="w-full h-[80%] rounded-xl object-cover" src={game.background_image} alt={game.name} width={1080} />
            <h2 className="text-[20px] dark:text-white font-bold p-2">{game.name}<span className="p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium">{game.metacritic}</span></h2>
            <h2 className="text-gray-500 p-1">⭐{game.rating} 💬{game.reviews_count}  🔥{game.suggestions_count}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;