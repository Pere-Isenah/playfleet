import React,{createContext,useState} from "react"

export const GameContext= createContext();

export const GameProvider= ({children})=>{
  const [genreList, setGenreList] = useState([]);
  const [allGameList, setGameList] = useState([]);
  const [gameListByGenreId, setGameListByGenreId] =useState([]);
 const [gameHeaderByGenreName, setGameHeaderByGenreName] =useState("Popular");
 const [genreId, setGenreId]=useState()
 return(
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
     setGenreId
   }}>
      {children}
      </GameContext.Provider>
   );
}