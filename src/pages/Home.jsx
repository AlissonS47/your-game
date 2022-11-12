import { useState, useRef } from "react"

import Header from "../components/Header";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import PreLoader from "../components/PreLoader";
import LoadMore from "../components/LoadMore";
import ScrollTopBtn from '../components/ScrollTopBtn'
import { useFetchGames } from "../hooks/useFetchGames";

const Home = () => {
  const scrollReference = useRef();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  const { data: games } = useFetchGames(page);

  const nextPage = () => {
    if (!games.next) {
      setLastPage(true);
      return;
    }
    setPage(prevPage => prevPage + 1);
  }

  return (
    <>
      <Header scrollReference={scrollReference} />
      <Container>
        {!games && <PreLoader />}
        {games &&
          <>
            <div className="flex-row flex-wrap flex-jc flex-g1">
              {games.results && games.results.map((game) => <GameCard game={game} key={game.id} />)}
            </div>
            <LoadMore callback={nextPage} lastPage={lastPage} />
          </>
        }
      </Container>
      <ScrollTopBtn scrollReference={scrollReference} />
    </>
  )
}

export default Home