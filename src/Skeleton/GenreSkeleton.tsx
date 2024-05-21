import React from "react"

const GenreSkeleton = () => (
  <div className="p-3 pr-4">
    <h1 className='text-2xl font-bold mb-4  border-b-2 border-slate-300 dark:text-white border-b-2 border-slate-200'>Genre</h1>
    {/* Placeholder skeleton items */}
    <div className="animate-pulse space-y-4">
      {[...Array(16)].map((_, index) => ( // Adjust the number 3 to the desired number of skeleton loaders
        <div key={index} className="flex gap-2 items-center rounded-xl p-2 mb-4 bg-gray-200 dark:bg-gray-700">
          <div className="h-20 w-20 bg-gray-300 dark:bg-gray-600 rounded-xl"></div>
          <div className="flex items-center">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 w-32 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GenreSkeleton;