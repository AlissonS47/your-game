import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import PreLoader from "../components/PreLoader";
import LoadMore from "../components/LoadMore";
import ScrollTopBtn from "../components/ScrollTopBtn";
import { useFetchGames } from "../hooks/useFetchGames";

const Search = () => {
  const scrollReference = useRef();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const [forceFetch, setForceFetch] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { data: searchedGames } = useFetchGames(page, query, forceFetch);

  const nextPage = () => {
    if (!searchedGames.next) {
      setLastPage(true);
      return;
    }
    setPage(prevPage => prevPage + 1);
  }

  useEffect(() => {
    if (page === 1) setForceFetch(prevForceFetch => !prevForceFetch);
    else setPage(1);
  }, [query]);

  return (
    <>
      <Header scrollReference={scrollReference} />
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
      <ScrollTopBtn scrollReference={scrollReference} />
    </>
  )
}

export default Search