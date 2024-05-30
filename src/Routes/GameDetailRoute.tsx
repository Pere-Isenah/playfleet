import React from 'react';
import { getGameDetails } from "../Services/GlobalApi";
import { ImSpinner4 } from "react-icons/im";

export function loader({ params }) {
  const { gameId } = params;
  const { data: gameDetails, isLoading, isError } = getGameDetails(gameId);

  if (isLoading) {
    // Return loading indicator or skeleton component while data is loading
    return <ImSpinner4 />;
  }

  if (isError) {
    // Handle error state
    return <ErrorPage />;
  }

  // Render the component with the loaded data
  return {gameDetails}
}