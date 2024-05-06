import React, {useEffect} from 'react'

function PopularGame({gameList}) {
    useEffect(() => {
        console.log(gameList)
    }, [gameList]);

  return (
    <div className='p-4'>
    <div>
      <h2 className='text-4xl font-bold dark:text-white'>Popular Games</h2>
    </div>
    <div className='grid grid-cols-4 gap-2 h-full'>
        {gameList.map((game, index)=>( index <4 ?
          <div className='h-full pb-14 p-4 '>
          <img width={1080} className=" h-full w-full rounded-t-lg object-cover"src={game.background_image}/>
          <h2 className="font-bold text-lg dark:text-white">{game.name}</h2>
          </div>:null
        ))}
    </div>
    </div>
  )
}

export default PopularGame