import { useState, useEffect } from "react"

import Container from "../components/Container";
import GameCard from "../components/GameCard";
import PreLoader from "../components/PreLoader";
import "./Home.css"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const Home = () => {
  const [games, setGames] = useState();
  const [preloader, setPreloader] = useState(true);

  const getGames = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGames(data.results);
    setPreloader(false);
  };

  useEffect(() => {
    setPreloader(true);
    const getGamesURL = `${gamesURL}?${apiKey}`;
    getGames(getGamesURL);
  }, []);

  return (
    <Container>
      {preloader && <PreLoader/>}
      {!preloader && 
        <div className="flex-row flex-wrap flex-jc flex-g1">
          {games && games.map((game) => <GameCard game={game} key={game.id}/>)}
        </div>
      }
    </Container>
  )
}

export default Home