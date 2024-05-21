import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey
  }
});
    
// Fetch genre list
export const getGenreList = async () => {
  try {
    const response = await axiosInstance.get('/genres');
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching genre list: ${error.message}`);
  }
};

// Fetch game list
export const getGameList = async () => {
  try {
    const response = await axiosInstance.get('/games', {
      params: {
        page_size: 40
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching game list: ${error.message}`);
  }
};

// Fetch games by genre ID
export const getGamesByGenreId = async (genreId) => {
  try {
    const response = await axiosInstance.get('/games', {
      params: {
        genres: genreId
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching games by genre ID: ${error.message}`);
  }
};