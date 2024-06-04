import React, { useContext } from "react";
import { useMatch } from "react-router-dom";
import GenreList from "../Components/GenreList";
import { GameContext } from "../Context/GameContext";
import { useQuery } from "react-query";
import { SignedIn, SignInButton, UserButton } from "@clerk/clerk-react";
import { FaCartPlus } from "react-icons/fa";
import GameBanner from "../Components/GameBanner";
import PopularGame from "../Components/PopularGame";
import GameList from "../Components/GameList";
import GameListSkeleton from "../Skeleton/GameListSkeleton";
import { useGamesByGenreId } from "../Services/GlobalApi";
import Search from "../Components/Search";
import FilterByPlatform from "../Components/FilterByPlatform";
import PlatFormGames from "../Components/PlatFormGames";
import AllGameList from "../Components/AllGameList";

function Home() {
  const { genreId } = useContext(GameContext);
  const gamesByGenreId = useGamesByGenreId({ genreId: genreId });
  const isPlatformRoute = useMatch("/platform/:platformId");
  const isGenreRoute = useMatch("/genre/:genreId"); // Assuming genre route is like '/genre/:genreId'

  return (
    <div className="grid grid-cols-4 px-2 py-3">
      <div className="hidden md:block">
        <GenreList />
      </div>

      <div className="col-span-4 md:col-span-3">
        <div>
          <FilterByPlatform />
          <div className="flex justify-end gap-2 pr-3">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignInButton className="bg-slate-500 p-1 px-2 dark:text-white rounded-lg" />
            <FaCartPlus className="text-2xl dark:text-white" />
          </div>
        </div>
        <Search />
        {isPlatformRoute ? (
          <PlatFormGames />
        ) : isGenreRoute ? (
          <GameList />
        ) : (
          <>
            <GameBanner />
            <PopularGame />
            {gamesByGenreId.isLoading ? (
              <GameListSkeleton />
            ) : gamesByGenreId.isError ? (
              "Error fetching games by genre ID"
            ) : (
              <AllGameList />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;