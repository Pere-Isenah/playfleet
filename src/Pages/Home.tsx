import React, { useEffect, useContext } from "react";
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import GameBanner from "../Components/GameBanner";
import GameList from "../Components/GameList";
import PopularGame from "../Components/PopularGame";
import { GameContext } from "../Context/GameContext";

function Home() {
  const {
    allGameList,
    setGameList,
    gameListByGenreId,
    setGameListByGenreId,
    gameHeaderByGenreName,
    setGameHeaderByGenreName,
    genreId,
    setGenreId
  } = useContext(GameContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await GlobalApi.getGameList();
        setGameList(resp);
      } catch (error) {
        console.error("Error fetching game list:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (genreId !== 0) {
      GlobalApi.getGameListByGenre(genreId).then(resp => {
        setGameListByGenreId(resp);
      });
    }
  }, [genreId]);

  useEffect(() => {
    console.log(gameHeaderByGenreName);
  }, [gameHeaderByGenreName]);

  return (
    <div className="grid grid-cols-4 px-2 py-3">
      <div className=" hidden md:block">
        <GenreList />
      </div>
      <div className="col-span-4 md:col-span-3">
        <GameBanner banner={allGameList[0]} />
        <div>
          <PopularGame gameList={allGameList} />
        </div>
        <GameList
          selectedGenre={
            gameListByGenreId.length > 0 ? gameListByGenreId : allGameList
          }
          selectedGenreName={gameHeaderByGenreName}
        />
      </div>
    </div>
  );
}

export default Home;