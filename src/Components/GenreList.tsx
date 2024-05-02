import React, { useEffect, useState } from 'react';
import GlobalApi from "../Services/GlobalApi";
import { ImInsertTemplate } from 'react-icons/im';

const GenreList = () => {
  const [genreList, setGenreList] = useState([]);

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
    <div>
      <h1 className='text-2xl font-bold'>Genre</h1>
      <div >
        {genreList.map((item, index) => (
          <div key={index} className='flex gap-2items-center bg-slate-300 rounded-xl p-3 mb-2 dark:gray-700'> {/* Add a unique key for each item */}
            <img className="h-24 w-28 object-cover rounded-xl"src={item.image_background} alt={item.name} />
            <h2>{item.name}</h2>
            {/* Additional content here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
