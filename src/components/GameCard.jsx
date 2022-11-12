import "./GameCard.css"

import { Link } from "react-router-dom"

import MetaCritic from './MetaCritic'
import Icon3do from "../img/platforms/3do.svg"
import IconAndroid from "../img/platforms/android.svg"
import IconAtari from "../img/platforms/atari.svg"
import IconCommodore from "../img/platforms/commodore-amiga.svg"
import IconIos from "../img/platforms/ios.svg"
import IconLinux from "../img/platforms/linux.svg"
import IconMac from "../img/platforms/mac.svg"
import IconNeoGeo from "../img/platforms/neo-geo.svg"
import IconNintendo from "../img/platforms/nintendo.svg"
import IconPC from "../img/platforms/pc.svg"
import IconPlaystation from "../img/platforms/playstation.svg"
import IconSega from "../img/platforms/sega.svg"
import IconWeb from "../img/platforms/web.svg"
import IconXbox from "../img/platforms/xbox.svg"
import BrokenImage from '../img/broken.jpg'

const GameCard = ({ game }) => {
  const platformIcon = (platform) => {
    switch (platform) {
      case "3do":
        return Icon3do;
      case "android":
        return IconAndroid;
      case "atari":
        return IconAtari;
      case "commodore-amiga":
        return IconCommodore;
      case "ios":
        return IconIos;
      case "linux":
        return IconLinux;
      case "mac":
        return IconMac;
      case "neo-geo":
        return IconNeoGeo;
      case "nintendo":
        return IconNintendo;
      case "pc":
        return IconPC;
      case "playstation":
        return IconPlaystation;
      case "sega":
        return IconSega;
      case "web":
        return IconWeb;
      case "xbox":
        return IconXbox;
    }
  }

  const imageError = (event) => {
    console.log('oi');
    event.target.src = BrokenImage;
    event.onerror = null;
  }

  return (
    <Link to={`/games/${game.slug}`}>
      <div className="game-card">
        {game.background_image ?
          <img className="game-card__image" src={game.background_image} alt="Game image" />
          : <img src={BrokenImage} alt="missing image" />
        }
        <div className="game-card__info">
          <div className="flex-row flex-jsb">
            <div className="game-card__platforms flex-row flex-ac">
              {game.parent_platforms && game.parent_platforms.map((platformItem) =>
                <img key={platformItem.platform.id} src={platformIcon(platformItem.platform.slug)} alt="Game platforms" />
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