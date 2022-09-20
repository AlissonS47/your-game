import { useState, useEffect } from "react"

import Container from "../components/Container";
import GameCard from "../components/GameCard";
import "./Home.css"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const Home = () => {
  const [games, setGames] = useState();

  const getGames = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGames(data.results);
  };

  useEffect(() => {
    const getGamesURL = `${gamesURL}?${apiKey}`;
    getGames(getGamesURL);
  }, []);

  return (
    <Container>
      <div className="flex-row flex-wrap flex-jc flex-g1">
        {games && games.map((game) => <GameCard game={game} key={game.id}/>)}
      </div>
    </Container>
  )
}

export default Home