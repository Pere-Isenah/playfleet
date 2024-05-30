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

export const useGameSearch = ({ search }) => {
  const searchParams = search ? `&search=${search}` : '';
  return useInfiniteQuery(["gamesBySearch", search], ({ pageParam = 1 }) => {
    return axios.get(`https://rawg.io/api/search?${searchParams}`, {
      params: {
        page_size: 40,
        page: pageParam,
        key: apiKey
      },
    }).then((res) => {
      if (typeof res.data !== "object" || !("results" in res.data)) {
        throw new Error("Invalid response");
      }
      console.log("search:", res.data.results)
      return {
        data: res.data.results,
        nextPage: res.data.next ? pageParam + 1 : null,
      };
    });
  }, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: false,
    onError: (error) => {
      console.error("Error fetching games by search:", error);
    },
    onSuccess: (data) => {
      console.log("Search Data fetched successfully:", data);
    },
  });
};export const getGameDetails = (id) => {
  // Ensure queryParams is a number
  const queryParams: number = id;

  return axiosInstance.get(`/games/${id}`)
    .then((res) => {
      console.log("Game details fetched successfully:", res.data);
      return res.data; // Return only the data here
    })
    .catch((error) => {
      console.error("Error fetching game details:", error);
      throw error; // Throw the error to handle it in the component
    });
};

export const useScreenshot = ({gameId}) => {
  const gameParams = gameId;

  return useQuery(["Screenshots", gameParams], () => {
    return axiosInstance.get(`/games/${gameParams}/screenshots`).then((res) => {
      console.log("Screenshots fetched successfully:", res.data.results);
      return res.data.results; // Return the fetched data
    });
  }, {
    onSuccess: (data) => {
      console.log("ss Successful:",data)
      // Handle success here, if needed
    },
    onError: (error) => {
      console.error("Error fetching screenshots:", error);
      // Handle error here, if needed
    }
  });
};