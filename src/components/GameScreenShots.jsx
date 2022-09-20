import { useState, useEffect } from "react"

import "./GameScreenShots.css"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const GameScreenShots = ({gamePk}) => {
  const [gameScreenShots, setGameScreenShots] = useState();

  const getGameScreenShots = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGameScreenShots(data.results);
  }

  useEffect(() => {
    const getGameDetailURL = `${gamesURL}/${gamePk}/screenshots?${apiKey}`;
    getGameScreenShots(getGameDetailURL);
  }, []);

  return (
    <div>
      <h2>Screenshots</h2>
      <div className="game-screenshots flex-row flex-wrap flex-jc flex-g1">
        {gameScreenShots && gameScreenShots.map((screenShot) => 
          <img key={screenShot.id} src={screenShot.image} alt="Game Screenshots" />)
        }
      </div>
    </div>
  )
}

export default GameScreenShots