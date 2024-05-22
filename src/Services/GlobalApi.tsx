import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

const apiKey = import.meta.env.VITE_API_KEY;

const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: apiKey,
  },
});

// Fetch genre list
export const getGenreList = async () => {
  try {
    const response = await axiosInstance.get("/genres");
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching genre list: ${error.message}`);
  }
};

// Fetch game list
export const getGameList = async () => {
  try {
    const response = await axiosInstance.get("/games", {
      params: {
        page_size: 40,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error(`Error fetching game list: ${error.message}`);
  }
};

// Fetch games by genre ID
export const getGamesByGenreId = async (genreId: number) => {
  try {
    const response = await axiosInstance.get("/games", {
      params: {
        genres: genreId,
      },
    });
    return response.data.results;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Error fetching games by genre ID: ${error.message}`);
    }
  }
};

export const useGamesByGenreId = ({
  genreId,
}: {
  genreId: number | undefined;
}) => {
  const queryParams = genreId ? "?genres=" + genreId : "";

  const query = useQuery({
    queryKey: ["gamesByGenreId", genreId],
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: false,
    queryFn: async () => {
      const res = await axiosInstance.get(`/games${queryParams}`, {
        params: {
          genres: genreId,
          page_size: 40,
        },
      });

      // validate response
      if (typeof res.data !== "object" && "length" in res.data)
        throw new Error("Invalid response");

      return res.data.results;
    },
    onError: (error) => {
      console.error("Error fetching games by genre ID:", error);
    },
    onSuccess: (data) => {
      // toast notification

      console.log("Data fetched successfully:", data);
    },
  });

  return query;
};
