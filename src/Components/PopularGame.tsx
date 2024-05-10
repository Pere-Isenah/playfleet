import React, {useEffect} from 'react'

function PopularGame({gameList}) {
    useEffect(() => {
        console.log(gameList)
    }, [gameList]);

  return (
    <div className='p-5 mt-9 hidden md:block'>
      <h2 className='text-4xl font-bold dark:text-white p-3'>Popular Games</h2>
    <div className='grid grid-cols-2 gap-6 p-3 h-full lg:grid-cols-4 '>
        {gameList.map((game, index)=>( index <4 ?
          <div key={index} className='h-full pb-14 p-4 rounded-lg bg-slate-400 dark:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
          <img width={1080} className=" h-[80%] w-full rounded-t-lg object-cover"src={game.background_image}/>
          <h2 className="font-bold text-lg text-center p-3 md:text-base  dark:text-white">{game.name}</h2>
          <div className="grid grid-cols-3 gap-1">
          <h4 className="dark:text-white text-xs"><span className="font-bold text-sm  inline-block">Rating:</span> {game.rating}</h4>
          <h4 className="dark:text-white text-xs"><span className="font-bold text-sm dark:text-white inline-block">Reviews:</span> {game.reviews_count}</h4>
          <p className="dark:text-white text-xs"><span className="font-bold dark:text-white inline-block text-sm">Suggestion:</span> {game.suggestions_count}</p>
          </div>
          </div>:null
        ))}
    </div>
    </div>
  )
}

export default PopularGame