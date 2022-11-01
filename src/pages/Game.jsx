import "./Game.css"

import { useParams } from "react-router-dom"

import Header from "../components/Header"
import Container from "../components/Container"
import MetaCritic from "../components/MetaCritic"
import PreLoader from "../components/PreLoader"
import GameCard from "../components/GameCard"
import Gallery from "../components/Gallery"
import { useFetchGame } from "../hooks/useFetchGame"

const Game = () => {
  const { pk } = useParams();
  const { data: gameDetail } = useFetchGame(pk);
  const { data: gameScreenshots } = useFetchGame(pk, 'screenshots');
  const { data: gameSeries } = useFetchGame(pk, 'game-series');

  return (
    <>
      {!gameDetail && <PreLoader />}
      {gameDetail &&
        <>
          <Header bgImage={gameDetail.background_image} />
          <div id="game-page">
            <Container>
              <div className="game-page__content">
                <div className="game-page__info flex-col-row flex-g2">
                  <div className="game-page__info-about">
                    <h2>{gameDetail.name}</h2>
                    <div dangerouslySetInnerHTML={{ __html: gameDetail.description }}></div>
                  </div>
                  <div className="game-page__info-detail">
                    <div>
                      <h3>Platforms</h3>
                      <p>
                        {gameDetail.platforms ?
                          gameDetail.platforms.map((platformU) => `${platformU.platform.name}, `)
                          : "Not informed"}
                      </p>
                    </div>
                    <div>
                      <h3>Metascore</h3>
                      {gameDetail.metacritic ?
                        <MetaCritic gameScore={gameDetail.metacritic} />
                        : "Not informed"}
                    </div>
                    <div>
                      <h3>Genre</h3>
                      <p>
                        {gameDetail.genres ?
                          gameDetail.genres.map((genre) => `${genre.name}, `)
                          : "Not informed"}
                      </p>
                    </div>
                    <div>
                      <h3>Release Date</h3>
                      <p>
                        {gameDetail.released ?
                          gameDetail.released
                          : "Not informed"}
                      </p>
                    </div>
                    <div>
                      <h3>Developer</h3>
                      <p>
                        {gameDetail.developers ?
                          gameDetail.developers.map((developer) => `${developer.name}, `)
                          : "Not informed"}
                      </p>
                    </div>
                    <div>
                      <h3>Publisher</h3>
                      <p>
                        {gameDetail.publishers ?
                          gameDetail.publishers.map((publisher) => publisher.name)
                          : "Not informed"}
                      </p>
                    </div>
                    <div>
                      <h3>Playtime</h3>
                      <p>
                        {gameDetail.playtime ?
                          gameDetail.playtime
                          : "Not informed"} Hours
                      </p>
                    </div>
                    <div>
                      <h3>Age Rating</h3>
                      <p>
                        {gameDetail.esrb_rating ?
                          gameDetail.esrb_rating.name
                          : "Not informed"}
                      </p>
                    </div>
                  </div>
                </div>
                <section id="game-page__screenshots">
                  <h2 className="text-center mt-3 mb-2">Screenshots</h2>
                  {!gameScreenshots && <PreLoader />}
                  {gameScreenshots && <Gallery images={gameScreenshots.results} />}
                </section>
                <section id="game-page__game-series">
                  <h2 className="text-center mt-3 mb-2">Game Series</h2>
                  {!gameSeries && <PreLoader />}
                  {gameSeries &&
                    <div className="flex-row flex-wrap flex-jc flex-g1">
                      {gameSeries.results.map((game) => <GameCard game={game} key={game.id} />)}
                    </div>
                  }
                </section>
              </div>
            </Container>
          </div>
        </>
      }
    </>
  )
}

export default Game