import React ,{useEffect,useState} from "react"
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import GameBanner from "../Components/GameBanner";
import GameList from "../Components/GameList";
import PopularGame from "../Components/PopularGame";
import "../index.css"

function Home(){

  const [allGameList, setGameList] = useState([]);
  const [gameListByGenreId, setGameListByGenreId] =useState([]);
 const [gameHeaderByGenreName, setGameHeaderByGenreName] =useState("Popular");
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await GlobalApi.getGameList();
        // console.log(resp)
        setGameList(resp);
        // Assuming resp has a "results" property containing the list of genres
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };
    fetchData();
  }, []);
const getGenreId=(genreId)=>{
  console.log(genreId)
  if(genreId!=0)
      {
  GlobalApi.getGameListByGenre(genreId).then(resp=>{
          console.log(resp)
          setGameListByGenreId(resp)
})}}
useEffect(()=>{
  console.log(gameHeaderByGenreName)
})

  return (
    <div className="grid grid-cols-4 px-2 py-3">
    <div className=" hidden md:block">
      <GenreList selectedGenreId={(genreId)=> getGenreId(genreId)} selectedGenreName={(genreName)=>setGameHeaderByGenreName(genreName)}/>
    </div>
    <div className="col-span-4 md:col-span-3">
      <GameBanner banner={allGameList[0]}/>
      <div>
      <PopularGame gameList={allGameList}/>
      </div>
      <GameList selectedGenre={gameListByGenreId.length >0 ? gameListByGenreId : allGameList} selectedGenreName={gameHeaderByGenreName}/>
    </div>
    </div>
    )
}
export default Home
