import React, { useContext, useEffect, useState } from "react";
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

function Home() {
  const { genreId, gameHeaderByGenreName, allGameList } =
    useContext(GameContext);

  // Fetch games by genre ID
  const gamesByGenreId = useGamesByGenreId({ genreId: genreId });

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
          <SignInButton className="bg-slate-500 p-1 px-2 dark:text-white rounded-lg" />
          <FaCartPlus className="text-2xl dark:text-white" />
        </div>
        <Search />
        <div>
          <GameBanner />
        </div>
        <div>
          <PopularGame />
        </div>
        {gamesByGenreId.isLoading ? (
          <GameListSkeleton />
        ) : gamesByGenreId.isError ? (
          "Error fetching games by genre ID"
        ) : (
          <GameList
            selectedGenre={gamesByGenreId.data}
            selectedGenreName={gameHeaderByGenreName}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
