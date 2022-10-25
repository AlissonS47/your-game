import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import PreLoader from "../components/PreLoader";

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState();
  const [preloader, setPreloader] = useState(true);
  const query = searchParams.get("q");

  const getSearchedGames = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSearch(data.results);
    setPreloader(false);
  };

  useEffect(() => {
    setPreloader(true);
    const searchURL = `${gamesURL}?${apiKey}&search=${query}`;
    getSearchedGames(searchURL);
  }, [query])

  return (
    <>
      <Header />
      <Container>
        {preloader && <PreLoader />}
        {!preloader &&
          <div className="flex-row flex-wrap flex-jc flex-g1">
            {search && search.map((game) => <GameCard game={game} key={game.id} />)}
          </div>
        }
      </Container>
    </>
  )
}

export default Search