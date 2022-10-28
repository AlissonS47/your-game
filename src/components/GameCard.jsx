import "./GameCard.css"

import { Link } from "react-router-dom"

import MetaCritic from './MetaCritic'

const GameCard = ({ game }) => {

  return (
    <Link to={`/games/${game.slug}`}>
      <div className="game-card">
        <img className="game-card__image" src={game.background_image} alt="Game image" />
        <div className="game-card__info">
          <div className="flex-row flex-jsb">
            <div className="game-card__platforms flex-row flex-ac">
              {game.parent_platforms && game.parent_platforms.map((platformItem) =>
                <img key={platformItem.platform.id} src={`src/img/platforms/${platformItem.platform.slug}.svg`} alt="Game platforms" />
              )}
            </div>
            {game.metacritic && <MetaCritic gameScore={game.metacritic} />}
          </div>
          <h3>{game.name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default GameCard