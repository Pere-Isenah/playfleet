import React from 'react'
import { ImSpinner4 } from "react-icons/im";
const SearchSkeleton = () => {
  return (
      <div className="flex pl-8 gap-2">
          <ImSpinner4 className="animate-spin h-8 w-8 mr-3 dark:text-white" />
          <span className="text-xl dark:text-white">Searching.....</span>
       </div>
  )
}

export default SearchSkeleton
