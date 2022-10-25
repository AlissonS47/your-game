import './Header.css'

import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

import Container from "./Container"
import Logo from "../img/logo.png"


const Header = ({ bgImage }) => {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    navigate(`/search?q=${search}`, { replace: true });
    setSearch("");
  };
  return (
    <header className={bgImage && 'bg-image'} style={bgImage && { backgroundImage: `url(${bgImage})` }}>
      <Container>
        <nav className='flex-row flex-jsb flex-ac'>
          <Link to="/">
            <img className='logo' src={Logo} alt="Logo" />
          </Link>
          <form onSubmit={handleSubmit}>
            <div className='form-field flex-row'>
              <input type="text" placeholder='Search Games' onChange={(e) => setSearch(e.target.value)} value={(search ? search : "")} />
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