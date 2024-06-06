import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getGameDetails } from '../Services/GlobalApi';
import Screenshots from '../Components/Screenshots';
import { FaArrowLeft } from 'react-icons/fa';
import {Game} from "../Components/games-interface"
import ScreenshotSkeleton from "../Skeleton/ScreenshotSkeleton"

 


// Loader function to fetch game details
export async function loader({ params }) {
  const game = await getGameDetails(params.gameId);
  return { game };
}

const GameDetails: React.FC = () => {
  const navigate = useNavigate();

  // Retrieve game details from loader data
  const { game }: { game: Game } = useLoaderData() as { game: Game };
  const [reveal, setReveal] = useState('line-clamp-6');
  const [btnName, setBtnName] = useState('Read More');
  const [btncolor, setBtncolor] = useState('bg-blue-400');
  if(Screenshots.isLoading){
    return <ScreenshotSkeleton />
  }

  const handleReveal = () => {
    reveal
      ? (setReveal(''), setBtnName('Read Less'), setBtncolor('bg-red-400'))
      : (setReveal('line-clamp-6'), setBtnName('Read More'), setBtncolor('bg-blue-400'));
  };

  return (
    <div className="h-screen">
      <div className="pl-4 pt-4">
        <FaArrowLeft onClick={() => navigate(-1)} className="text-lg dark:text-white" />
      </div>
      <div className="grid grid-cols-2 dark:text-white p-3 gap-1.5">
        <div className="grid col-span-1 pl-3" key={game.id}>
          <h1 className="text-4xl font-bold mb-3 p-2">{game.name}</h1>
          <p className={`${reveal} px-2 overflow-hidden transition-all ease-in-out delay`}>{game.description_raw}</p>
          <button className={`w-28 p-1 ml-3 ${btncolor} text-base rounded-md mt-2`} onClick={handleReveal}>
            {btnName}
          </button>
          <div className="grid grid-cols-2 mt-8 p-2 pl-2">
            <div className="grid col-span-1">
            <h2 className="font-bold text-2xl">Platform</h2>
            {game.parent_platforms.map((platform, index) => (
              <p className="text-lg pl-2" key={index}>{platform.platform.name}</p>
            ))}
            <h2 className="font-bold text-2xl">Metacritic</h2>
            <p className="text-lg pl-2">{game.metacritic}</p>
            <h2 className="font-bold text-2xl">Released Date </h2>
              <p className="text-lg pl-2">{game.released}</p>
          </div>
          <div className="grid col-span-1">
            <h2 className="font-bold text-2xl">Rating</h2>
            <p className="text-lg pl-2">{game.rating}</p>
            <h2 className="font-bold text-2xl">Genre</h2>
            {game.genres.map((genre, index) => (
              <p className="text-lg pl-2" key={index}>{genre.name}</p>
            ))}
            <h2 className="font-bold text-2xl">Publisher</h2>
            {game.publishers.map((publisher, index) => (
              <p className="text-lg pl-2" key={index}>{publisher.name}</p>
            ))}
          </div>
          </div>
        </div>
        <div>
          <Screenshots gameId={game.id} />
        </div>
      </div>
    </div>
  );
};

export default GameDetails;