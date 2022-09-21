import './App.css'

import { useState, useEffect} from 'react'
import {Link, Outlet, useNavigate, useLocation} from "react-router-dom"
import {BiSearchAlt2} from "react-icons/bi"
import Container from "./components/Container"

import Logo from "./img/logo.png"

function App() {
  const [search, setSearch] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };

  return (
    <div className="App">
      <header className={(location.pathname.startsWith('/games/') ? "game-page": "")}>
        <Container>
          <nav className='flex-row flex-jsb flex-ac'>
            <Link to="/">
              <img className='logo' src={Logo} alt="Logo" />
            </Link>
            <form onSubmit={handleSubmit}>
              <div className='flex-row'>
                <input type="text" placeholder='Search Games' onChange={(e) => setSearch(e.target.value)} value={(search ? search : "")}/>
                <button type='submit'>
                  Search
                </button>
              </div>
            </form>
          </nav>
        </Container>
      </header>
      <Outlet/>
    </div>
  )
}

export default App
