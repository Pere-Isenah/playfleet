import React, { useEffect } from 'react';
import GlobalApi from "../Services/GlobalApi";

const GenreList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await GlobalApi.getGenreList();
        console.log(resp);
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      genre list
    </div>
  );
};

export default GenreList;
