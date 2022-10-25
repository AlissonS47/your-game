import "./Game.css"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Header from "../components/Header"
import Container from "../components/Container"
import GameScreenShots from "../components/GameScreenShots"
import MetaCritic from "../components/MetaCritic"
import GameSeries from "../components/GameSeries"
import PreLoader from "../components/PreLoader"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const Game = () => {
  const { pk } = useParams();
  const [gameDetail, setGameDetail] = useState();
  const [preloader, setPreloader] = useState(true);

  const getGameDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGameDetail(data);
    setPreloader(false);
  }

  useEffect(() => {
    setPreloader(true);
    const getGameDetailURL = `${gamesURL}/${pk}?${apiKey}`;
    getGameDetail(getGameDetailURL);
  }, [pk]);

  return (
    <>
      {preloader && <PreLoader />}
      {!preloader &&
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
                <GameScreenShots gamePk={gameDetail.slug} />
                <GameSeries gamePk={gameDetail.slug} />
              </div>
            </Container>
          </div>
        </>
      }
    </>
  )
}

export default Game