import React, {useEffect} from 'react'
import GlobalApi from "../Services/GlobalApi"


useEffect(()=> {
  getGenreList();
},[])

const GenreList = () => {
  const getGenreList= () =>{
    GlobalApi.getGenreList.then((resp)=>{
      console.log(resp);
    })
  }
  return (
    <div>
    genre list
    </div>
  )
}

export default GenreList