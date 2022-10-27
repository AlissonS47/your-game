import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import PreLoader from "../components/PreLoader";
import LoadMore from "../components/LoadMore";
import { useFetchGames } from "../hooks/useFetchGames";

const Search = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { data: searchedGames } = useFetchGames(page, query);

  const nextPage = () => {
    if (!searchedGames.next) {
      setLastPage(true);
      return;
    }
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    setPage(1);
  }, [query]);

  /*
  useEffect(() => {
    setPreloader(true);
    const searchURL = `${gamesURL}?${apiKey}&search=${query}`;
    getSearchedGames(searchURL);
  }, [query])
  */

  return (
    <>
      <Header />
      <Container>
        {!searchedGames && <PreLoader />}
        {searchedGames &&
          <>
            <div className="flex-row flex-wrap flex-jc flex-g1">
              {searchedGames.results && searchedGames.results.map((game) => <GameCard game={game} key={game.id} />)}
            </div>
            <LoadMore callback={nextPage} lastPage={lastPage} />
          </>
        }
      </Container>
    </>
  )
}

export default Search