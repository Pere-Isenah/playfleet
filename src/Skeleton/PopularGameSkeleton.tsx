import React from 'react';

function PopularGameSkeleton() {
  return (
    <div className='p-5 mt-9 hidden md:block'>
      <h2 className='text-4xl font-bold dark:text-white p-3'>Popular Games</h2>
      <div className='grid grid-cols-2 gap-6 p-3 h-full lg:grid-cols-4 '>
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className='h-full pb-20 p-4 rounded-lg bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer animate-pulse'>
            <div className="h-[80%] w-full rounded-t-lg bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 mt-3 animate-pulse"></div>
            <div className="grid grid-cols-3 gap-1 mt-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularGameSkeleton;