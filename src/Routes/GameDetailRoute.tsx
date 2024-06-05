import React from 'react';
import { getGameDetails } from "../Services/GlobalApi";
import { ImSpinner4 } from "react-icons/im";

// Import ErrorPage from the appropriate file
import ErrorPage from '../Components/ErrorPage'; // Adjust the path accordingly

export function loader({ params }) {
  const { gameId } = params;

  // Use a loading state to handle the asynchronous nature of getGameDetails()
  const [gameDetails, setGameDetails] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  // Fetch game details when the component mounts
  React.useEffect(() => {
    // Fetch game details
    getGameDetails(gameId)
      .then((data) => {
        // Update state with the fetched data
        setGameDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching game details:', error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [gameId]);

  if (isLoading) {
    // Return loading indicator or skeleton component while data is loading
    return <ImSpinner4 />;
  }

  if (isError) {
    // Handle error state
    return <ErrorPage />;
  }

  // Render the component with the loaded data
  return { gameDetails };
}