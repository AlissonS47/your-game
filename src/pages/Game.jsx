import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import "./Game.css"
import Container from "../components/Container"
import GameScreenShots from "../components/GameScreenShots"
import MetaCritic from "../components/MetaCritic"
import GameSeries from "../components/GameSeries"

const apiKey = import.meta.env.VITE_API_KEY;
const gamesURL = import.meta.env.VITE_API_GAMES;

const Game = () => {
  const { pk } = useParams();
  const [gameDetail, setGameDetail] = useState();

  const getGameDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setGameDetail(data);
  }

  useEffect(() => {
    const getGameDetailURL = `${gamesURL}/${pk}?${apiKey}`;
    getGameDetail(getGameDetailURL);
  }, []);

  return (
    <div id="game-page">
      <div className="game-page__image-container">
        <img src={gameDetail && gameDetail.background_image} alt="Game image" />
      </div>
      <Container>
        <div className="game-page__content">
          <div className="game-page__info flex-row flex-g2">
            <div className="game-page__info-about">
              <h2>{gameDetail && gameDetail.name}</h2>
              {gameDetail && 
                <div dangerouslySetInnerHTML={{__html: gameDetail.description}}></div>
              }
            </div>
            <div className="game-page__info-detail">
              <div>
                <h3>Platforms</h3>
                <p>{gameDetail && gameDetail.platforms.map((platformU) => `${platformU.platform.name}, `)}</p>
              </div>
              <div>
                <h3>Metascore</h3>
                <MetaCritic gameScore={gameDetail && gameDetail.metacritic}/>
              </div>
              <div>
                <h3>Genre</h3>
                <p>{gameDetail && gameDetail.genres.map((genre) => `${genre.name}, `)}</p>
              </div>
              <div>
                <h3>Release Date</h3>
                <p>{gameDetail && gameDetail.released}</p>
              </div>
              <div>
                <h3>Developer</h3>
                <p>{gameDetail && gameDetail.developers.map((developer) => `${developer.name}, `)}</p>
              </div>
              <div>
                <h3>Publisher</h3>
                <p>{gameDetail && gameDetail.publishers.map((publisher) => publisher.name)}</p>
              </div>
              <div>
                <h3>Playtime</h3>
                <p>{gameDetail && gameDetail.playtime} Hours</p>
              </div>
              <div>
                <h3>Age Rating</h3>
                <p>{gameDetail && gameDetail.esrb_rating.name}</p>
              </div>
            </div>
          </div>
          <div className="game-page__screenshots">
            {gameDetail && <GameScreenShots gamePk={gameDetail.slug}/>}
          </div>
          <div>
            {gameDetail && <GameSeries gamePk={gameDetail.slug}/>}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Game