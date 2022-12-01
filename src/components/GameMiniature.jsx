import './GameMiniature.css'

import React from 'react'
import { Link } from 'react-router-dom'

import BrokenImage from '../img/broken.jpg'

const GameMiniature = ({ game }) => {
  return (
    <Link to={`/games/${game.slug}`}>
      <div className='game-miniature flex-row flex-ac flex-g05'>
        {game.background_image ?
          <img src={game.background_image} alt="game image" />
          : <img src={BrokenImage} alt="missing image" />
        }
        <h4>{game.name}</h4>
      </div>
    </Link>
  )
}

export default GameMiniature