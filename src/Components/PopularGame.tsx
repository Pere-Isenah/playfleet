import React, {useEffect} from 'react'

function PopularGame({gameList}) {
    useEffect(() => {
        console.log(gameList)
    }, [gameList]);

  return (
    <div>
    </div>
  )
}

export default PopularGame