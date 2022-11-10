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

  const namesList = (list) => {
    return list.join(',');
  };

  return (
    <>
      <Header bgImage={gameDetail && gameDetail.background_image} />
      {!gameDetail && <PreLoader />}
      {gameDetail &&
        <div id="game-page">
          <Container>
            <div className="game-page__content">
              <section className="game-page__info flex-col-row flex-g2">
                <div className="game-page__info-about">
                  <h2>{gameDetail.name}</h2>
                  <div dangerouslySetInnerHTML={{ __html: gameDetail.description }}></div>
                </div>
                <div className="game-page__info-detail">
                  <div>
                    <h3>Platforms</h3>
                    <p>
                      {gameDetail.platforms ?
                        gameDetail.platforms.map((platformU) => platformU.platform.name).join(', ')
                        : "Not informed"}
                    </p>
                  </div>
                  <div>
                    <h3>Developer</h3>
                    <p>
                      {gameDetail.developers ?
                        gameDetail.developers.map((developer) => developer.name).join(', ')
                        : "Not informed"}
                    </p>
                  </div>
                  <div>
                    <h3>Publisher</h3>
                    <p>
                      {gameDetail.publishers ?
                        gameDetail.publishers.map((publisher) => publisher.name).join(', ')
                        : "Not informed"}
                    </p>
                  </div>
                  <div>
                    <h3>Genre</h3>
                    <p>
                      {gameDetail.genres ?
                        gameDetail.genres.map((genre) => genre.name).join(', ')
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
                    <h3>Metascore</h3>
                    {gameDetail.metacritic ?
                      <MetaCritic gameScore={gameDetail.metacritic} />
                      : "Not informed"}
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
              </section>

              <section className="game-page__media">
                {gameScreenshots &&
                  <>
                    <h2 className="text-center mb-2">Screenshots</h2>
                    <Gallery images={gameScreenshots.results} />
                  </>
                }
              </section>

              <section id="game-page__game-series">
                {gameSeries &&
                  <>
                    <h2 className="text-center mt-3 mb-2">Game Series</h2>
                    <div className="flex-row flex-wrap flex-jc flex-g1">
                      {gameSeries.results.map((game) => <GameCard game={game} key={game.id} />)}
                    </div>
                  </>
                }
              </section>
            </div>
          </Container>
        </div >
      }
    </>
  )
}

export default Game