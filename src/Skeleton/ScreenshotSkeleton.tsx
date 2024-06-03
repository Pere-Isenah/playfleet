import React from 'react'

function ScreenshotSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {[...Array(4)].map((_, index) => (
        <div className="bg-gray-300 dark:bg-gray-600 animate-pulse" key={index}>
          <div className="h-[58.33%] w-[66.67%] bg-gray-400 dark:bg-gray-700 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default ScreenshotSkeleton;
