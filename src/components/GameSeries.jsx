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
    console.log(data.results);
    setGameSeries(data.results);
  };

  useEffect(() => {
    const gameSeriesURL = `${gamesURL}/${gamePk}/game-series?${apiKey}`;
    getGameSeries(gameSeriesURL);
  }, []);

  return (
    <div className="game-series">
      <h2 className="text-center">Other games of this series</h2>
      <div className="flex-row flex-wrap flex-jc flex-g1">
        {gameSeries && gameSeries.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </div>
  )
}

export default GameSeries