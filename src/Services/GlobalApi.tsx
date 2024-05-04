import axios from "axios";

const key = import.meta.env.VITE_API_KEY;
const axiosCreate = axios.create({baseURL: "https://api.rawg.io/api"});

const getGenreList = async () => {
  try {
    const response = await axiosCreate.get("/genres?key=" + key);
    return response.data.results; 
    console.log(response.data.results)// Return the data from the response
  } catch (error) {
    throw error; // Re-throw the error to handle it in the component
  }
};

export default {
  getGenreList
};
