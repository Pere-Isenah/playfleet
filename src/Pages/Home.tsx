import React ,{useEffect,useState} from "react"
import GenreList from "../Components/GenreList";
import GlobalApi from "../Services/GlobalApi";
import GameBanner from "../Components/GameBanner";

function Home(){

  const [allGameList, setGameList] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await GlobalApi.getGameList();
        console.log(resp)
        setGameList(resp);
        // Assuming resp has a "results" property containing the list of genres
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="grid grid-cols-4 px-2 py-3">
    <div className=" hidden md:block">
      <GenreList/>
    </div>
    <div className="col-span-4 md:col-span-3">
      <GameBanner banner={allGameList[0]}/>
    </div>
    </div>
    )
}
export default Home
