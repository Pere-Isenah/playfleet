import React, {useEffect} from 'react'

function PopularGame({gameList}) {
    useEffect(() => {
        console.log(gameList)
    }, [gameList]);

  return (
    <div className='p-5 mt-9'>
      <h2 className='text-4xl font-bold dark:text-white p-3'>Popular Games</h2>
    <div className='grid grid-cols-1 gap-6 p-3 h-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 '>
        {gameList.map((game, index)=>( index <4 ?
          <div className='h-full pb-14 p-4 rounded-lg bg-slate-500 dark:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'>
          <img width={1080} className=" h-[80%] w-full rounded-t-lg object-cover"src={game.background_image}/>
          <h2 className="font-bold text-lg text-center p-3 md:text-base dark:text-white">{game.name}</h2>
          <h2>{game.rating} {game.reviews_count} {game.suggestions_count
}</h2>
          </div>:null
        ))}
    </div>
    </div>
  )
}

export default PopularGame