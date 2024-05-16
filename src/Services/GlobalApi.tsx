import axios from "axios";

const key = import.meta.env.VITE_API_KEY;
const axiosCreate = axios.create({baseURL: "https://api.rawg.io/api"});

const getGenreList = async () => {
  try {
    const response = await axiosCreate.get("/genres?key=" + key);
    console.log("genre:",response.data.results)
    return response.data.results; 
  } catch (error) {
    throw error; // Re-throw the error to handle it in the component
  }
};
const getGameList =async () => {
  try {
    const response = await axiosCreate.get("/games?key=" + key +"&page_size=40");
    console.log("api:",response.data.results)
    return response.data.results; 
    // Return the data from the response
  } catch (error) {
    throw error; // Re-throw the error to handle it in the component
  }
};
const getGameListByGenre = async (id) => {
  try {
    const response = await axiosCreate.get("/games?key=" + key + "&genres=" + id);
    console.log("genre:",response.data.results); // Log the data from the response
    return response.data.results; // Return the data from the response
  } catch (error) {
    throw error; // Re-throw the error to handle it in the component
  }
};

export default {
  getGenreList, getGameList, getGameListByGenre
};
