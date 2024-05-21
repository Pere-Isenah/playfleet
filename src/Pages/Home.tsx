import React, { useContext } from "react";
import GenreList from "../Components/GenreList";
import { GameContext } from "../Context/GameContext";
import { useQuery } from 'react-query';
import { SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";
import { FaCartPlus } from "react-icons/fa";
import GameBanner from "../Components/GameBanner";
import PopularGame from "../Components/PopularGame";
import GameList from "../Components/GameList";
import { getGamesByGenreId } from "../Services/GlobalApi";
import GameListSkeleton from "../Skeleton/GameListSkeleton";

function Home() {
  const  {genreId, gameHeaderByGenreName, allGameList} = useContext(GameContext)
  
  const {isLoading: isLoadingGamesByGenreId, isError: isErrorGamesByGenreId, data: gamesByGenreId } = useQuery("gamesByGenreId", () => getGamesByGenreId(genreId), {
  staleTime: 24 * 60 * 60 * 1000,
})

  if (isLoadingGamesByGenreId) {
    return <GameListSkeleton />; // Render loading indicator while data is loading
  }

  if (isErrorGamesByGenreId) {
    return <div>Error fetching game list!</div>; // Render error message if an error occurs
  }

  // Example usage of useQuery hook
  {/*const { data: gameList, isLoading, isError } = useQuery('gameList', () => getGameList(genreId));*/}

  {/*if (isLoading) {
    return <div>Loading...</div>;
  }*/}

  {/*if (isError) {
    return <div>Error fetching game list!</div>;
  }*/}

  return (
    <div className="grid grid-cols-4 px-2 py-3">
      <div className="hidden md:block">
        <GenreList />
      </div>
       
      <div className="col-span-4 md:col-span-3">
        <div className="flex justify-end gap-2 pr-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignInButton className="bg-slate-500 p-1 px-2 dark:text-white rounded-lg"/>
          <FaCartPlus className="text-2xl dark:text-white"/>
        </div>
        {/* <Search /> */}
        <div>
         <GameBanner /> 
         </div>
        <div> 
          <PopularGame />
        </div>
        <GameList 
         selectedGenre={ 
           gamesByGenreId.length > 0 ? gamesByGenreId : allGameList 
          } 
        selectedGenreName={gameHeaderByGenreName} 
        /> 
      </div>
    </div>
  );
}

export default Home;