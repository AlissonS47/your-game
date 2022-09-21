import { useState, useEffect } from "react"

import GameCard from "./GameCard"

import "./GameSeries.css"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const GameSeries = ({gamePk}) => {
  const [gameSeries, setGameSeries] = useState();

  const getGameSeries = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGameSeries(data.results);
  };

  useEffect(() => {
    const gameSeriesURL = `${gamesURL}/${gamePk}/game-series?${apiKey}`;
    getGameSeries(gameSeriesURL);
  }, [gamePk]);

  return (
    <div className="game-series mt-3">
      {gameSeries &&
        <>
        <h2 className="text-center mb-2">Other games in this franchise</h2>
        <div className="flex-row flex-wrap flex-jc flex-g1">
          {gameSeries.map((game) => <GameCard game={game} key={game.id}/>)}
        </div>
        </>
      }
    </div>
  )
}

export default GameSeries