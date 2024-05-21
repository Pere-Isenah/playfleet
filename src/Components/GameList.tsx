import React, {useEffect,useContext} from 'react'
import { useQuery } from 'react-query';


const GameList= ({selectedGenre, selectedGenreName}) =>{
  
  useEffect(()=>{
  console.log(selectedGenreName)})
  
  return (
    <div className="p-4">
    <h2 className="text-3xl font-bold p-3 mb-3 dark:text-white">{selectedGenreName} Games</h2>
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {selectedGenre.map((item) =>( 
    <div className="bg-slate-300 p-3 pb-9 h-full rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer dark:bg-gray-700">
     <img className="w-full h-[80%] rounded-xl object-cover"src={item.background_image} width={1080} />
     <h2 className="text-[20px] dark:text-white font-bold p-2">{item.name}<span className='p-1 rounded-sm ml-2 text-[10px] bg-green-100 text-green-700 font-medium'>{item.metacritic}</span></h2>
     <h2 className='text-gray-500 p-1'>⭐{item.rating} 💬{item.reviews_count}  🔥{item.suggestions_count}</h2>
    </div>
    ))}
    </div>
    </div>
  )
}

export default GameList