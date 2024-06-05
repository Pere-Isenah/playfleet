import React, { createContext, useState } from 'react';

// Define the type for the context value object
interface GameContextType {
  genreList: any[]; // Define the type for each context value
  setGenreList: React.Dispatch<React.SetStateAction<any[]>>;
  allGameList: any[];
  setGameList: React.Dispatch<React.SetStateAction<any[]>>;
  gameListByGenreId: any[];
  setGameListByGenreId: React.Dispatch<React.SetStateAction<any[]>>;
  gameHeaderByGenreName: string;
  setGameHeaderByGenreName: React.Dispatch<React.SetStateAction<string>>;
  genreId: string;
  setGenreId: React.Dispatch<React.SetStateAction<string>>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  platformTitle: string;
  setPlatformTitle: React.Dispatch<React.SetStateAction<string>>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [genreList, setGenreList] = useState<any[]>([]);
  const [allGameList, setGameList] = useState<any[]>([]);
  const [gameListByGenreId, setGameListByGenreId] = useState<any[]>([]);
  const [gameHeaderByGenreName, setGameHeaderByGenreName] = useState("");
  const [genreId, setGenreId] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const [platformTitle, setPlatformTitle] = useState("");

  return (
    <GameContext.Provider value={{
      genreList,
      setGenreList,
      allGameList,
      setGameList,
      gameListByGenreId,
      setGameListByGenreId,
      gameHeaderByGenreName,
      setGameHeaderByGenreName,
      genreId,
      setGenreId,
      searchInput,
      setSearchInput,
      platformTitle,
      setPlatformTitle,
    }}>
      {children}
    </GameContext.Provider>
  );
};