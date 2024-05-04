import React from "react"
import GenreList from "../Components/GenreList"


function Home(){
  return (
    <div className="grid grid-cols-4 px-2 py-3 ">
    <div className=" hidden md:block ">
      <GenreList />
    </div>
    <div className="bg-blue-300 col-span-4 md:col-span-3">
      <h1>game list</h1>
    </div>
    </div>
    )
}
export default Home
