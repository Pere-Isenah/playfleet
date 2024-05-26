import axios from "axios"; // Import axios properly

import { useQuery, useInfiniteQuery } from "react-query";

// Assuming import.meta.env.VITE_API_KEY is declared elsewhere
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

export const getGameList = async ({ pageParam }) => {
  try {
    const response = await axiosInstance.get("/games", {
      params: {
        page: pageParam,
        page_size: 40,
      },
    });
    console.log("api:", response.data);
    return response.data.results; // This should be returned here
  } catch (error) {
    throw new Error(`Error fetching game list: ${error.message}`);
  }
};

export const useGameList = () => {
  return useInfiniteQuery(["games"], ({ pageParam = 2 }) => getGameList({ pageParam }), {
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.next;
      return nextPage ? nextPage : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: false,
    onError: (error) => {
      console.error("Error fetching game list:", error);
    },
    onSuccess: (data) => {
      // toast notification
      console.log("Data fetched successfully:", data);
    },
    getFetchMore: (lastGroup, allGroups) => {
      return lastGroup.hasNextPage ? lastGroup.nextPage : false;
    },
  });
};
export const useGamesByGenreId = ({ genreId }: { genreId: number | undefined }) => {
  const queryParams = genreId ? "?genres=" + genreId : "";

  return useInfiniteQuery(["gamesByGenreId", genreId], ({ pageParam = 1 }) => {
    return axiosInstance.get(`/games${queryParams}`, {
      params: {
        genres: genreId,
        page: pageParam,
        page_size: 40,
      },
    }).then((res) => {
      if (typeof res.data !== "object" && "length" in res.data) {
        throw new Error("Invalid response");
      }
      console.log("API Response:", res.data);
      const nextPage = res.data.next; // Assuming 'next' property indicates next page
      console.log("Next Page:", nextPage);
      return {
        data: res.data.results,
        nextPage: nextPage ? pageParam + 1 : null, // Set nextPage to null if there's no next page
      };
    });
  }, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: false,
    onError: (error) => {
      console.error("Error fetching games by genre ID:", error);
    },
    onSuccess: (data) => {
      // toast notification
      console.log("Data fetched successfully:", data);
    },
  });
};
