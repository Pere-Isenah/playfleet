import React, {useEffect} from 'react'



function GameBanner({ banner }) {
  useEffect(() => {
    console.log(banner);
  }, [banner]);

  if (!banner || !banner.background_image) {
    return null; // or render a placeholder image
  }

  return (
    <div className="p-4 relative mt-3">
      <div className="absolute bottom-0  bg-gradient-to-t w-11/12 from-slate-900 to-transparent pb-10 mb-3 px-3 rounded-b-lg ">
      <h2 className='font-bold text-white text-5xl'>{banner.name}</h2>
      <button className="bg-slate-400 p-3 mt-2 font-bold text-lg text-white rounded-xl dark:bg-gray-700">Get more</button>
      </div>
      <img className="h-96 w-full object-top object-cover rounded-xl" src={banner.background_image} alt="Game Banner" />
    </div>
  );
}

export default GameBanner;