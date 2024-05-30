import React from 'react';
import { useScreenshot } from "../Services/GlobalApi";

const Screenshots = ({ gameId }) => {
  const { data: screenshots, isLoading, isError } = useScreenshot({ gameId });

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }

  if (isError) {
    return <div>Error fetching screenshots</div>; // Render an error message if there's an error
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {screenshots.map((screenshot, index) => ( index <4 &&(
        <div key={screenshot.id}>
          <img src={screenshot.image} alt={`Screenshot ${index + 1}`} />
        </div>)
      ))}
    </div>
  );
};

export default Screenshots;