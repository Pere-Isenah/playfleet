import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GameContext } from "../Context/GameContext"; 

function FilterByPlatform() {
  const platformList = {
    PC: 1,
    PlayStation: 2,
    Xbox: 3,
    Mac: 5,
    Nintendo: 7,
    Linux: 6,
    Ios: 4,
    Android: 8,
    Web: 14,
  };

  const { setPlatformTitle } = useContext(GameContext);
  const navigate = useNavigate();

  const handlePlatformChange = (event) => {
    const platformId = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const title = selectedOption.text;
    setPlatformTitle(title);
    console.log(title);
    navigate(`/platform/${platformId}`);
  };

  return (
    <div className="">
      <div className='text-xs dark:text-white'>Filter Platform: </div>
      <select
        label="filter"
        className="rounded-md border border-black dark:border-white dark:bg-black dark:text-white"
        onChange={handlePlatformChange}
        defaultValue="" // to make sure the default option is selected initially
      >
        <option value="" disabled>Select</option>
        {Object.entries(platformList).map(([key, value]) => (
          <option key={value} value={value}>{key}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterByPlatform;
