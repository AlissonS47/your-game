import './Header.css'

import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"

import Container from "./Container"
import Logo from "../img/logo.png"
import LoadingSVG from '../img/loading.svg'
import GameMiniature from './GameMiniature'
import { useFetchLiveSearch } from "../hooks/useFetchLiveSearch"


const Header = ({ bgImage, scrollReference }) => {
  const [search, setSearch] = useState();
  const [forceFetch, setForceFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchHover, setSearchHover] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: liveSearchedGames } = useFetchLiveSearch(search, forceFetch);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
    setLoading(false);
  };

  const [timer, setTimer] = useState();
  const liveSearch = () => {
    clearTimeout(timer);
    if (!search) return;
    setTimer(
      setTimeout(() => {
        setForceFetch(prevForceFetch => !prevForceFetch);
        setLoading(true);
      }, 500)
    );
  }

  const closeSearch = () => {
    if (searchHover) return;
    setLoading(false);
  }

  useEffect(() => {
    setSearch('');
    setLoading(false);
    setSearchHover(false);
  }, [pathname]);

  return (
    <header className={bgImage && 'bg-image'} style={bgImage && { backgroundImage: `url(${bgImage})` }}>
      <Container>
        <nav className='flex-row flex-jsb flex-ac flex-g1' ref={scrollReference}>
          <Link to="/">
            <img className='logo' src={Logo} alt="Logo" />
          </Link>
          <form onSubmit={handleSubmit}>
            {loading &&
              <div className='form-search flex-col flex-g05'
                onMouseOver={() => setSearchHover(true)}
                onMouseOut={() => setSearchHover(false)}>
                {liveSearchedGames ?
                  liveSearchedGames.results.slice(0, 5).map((game) => <GameMiniature game={game} key={game.id} />)
                  : <div className='flex-row flex-jc flex-ac'>
                    <img src={LoadingSVG} alt='Loading' />
                  </div>
                }
              </div>
            }
            <div className='form-field flex-row'>
              <input
                type="text"
                placeholder='Search Games'
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={liveSearch}
                onBlur={closeSearch}
                value={(search ? search : "")} />
              <button type='submit'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </nav>
      </Container>
    </header>
  )
}

export default Header