import React, { useEffect, useState } from 'react';
import GlobalApi from "../Services/GlobalApi";
import { ImInsertTemplate } from 'react-icons/im';

const GenreList = () => {
  const [genreList, setGenreList] = useState([]);
  const [active,setActive]=useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await GlobalApi.getGenreList();
        setGenreList(resp); 
        console.log(resp)// Assuming resp has a "results" property containing the list of genres
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-3 pr-4">
      <h1 className='text-2xl font-bold mb-4  border-b-2 border-slate-300 dark:text-white border-b-2 border-slate-200'>Genre</h1>
      <div >
        {genreList.map((item, index) => (
          <div key={index} className={`flex gap-2 items-center bg-slate-300 rounded-xl p-2 mb-4 text-black dark:bg-gray-700 text-white hover:scale-110 transition-all duration-300 cursor-pointer {active==index? "bg-slate-300 dark:bg-gray-700":,null }`} onClick={()=>setActive(index)}>
            <img className="h-20 w-20 object-cover rounded-xl"src={item.image_background} alt={item.name} />
            <div className="flex items-center">
            <h2 className="font-bold text-lg sm:text-base">{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
