import React, { useContext, useEffect } from "react";
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
  const gamesByGenreId = getGamesByGenreId(genreId)
  
  useEffect(() => {
    if (genreId) {
      console.log("genreId:", genreId);
      getGamesByGenreId(genreId);
    }
  }, [genreId]);
  
  console.log("test:", gamesByGenreId)

  // Conditionally execute useQuery based on genreId
  



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