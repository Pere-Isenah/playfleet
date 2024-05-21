import React from 'react'

const GameBannerSkeleton = () => {
  return (
    <div>
    <div className="animate-pulse p-4 relative mt-3 w-full h-[416px] bg-gray-400 dark:bg-gray-700 rounded-lg">
      <div className="absolute bottom-0  pb-10 mb-3 px-3 rounded-b-lg ">
      </div>
      <h2 className='font-bold text-white text-5xl rounded-lg '></h2>
      <div className="bg-slate-400 p-3 mt-2 font-bold text-lg text-white rounded-xl dark:bg-gray-700"></div>
      </div>
    
    </div>
  )
}

export default GameBannerSkeleton