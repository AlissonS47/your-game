import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {HashRouter, BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import Search from "./pages/Search"
import Game from "./pages/Game"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />}/>
          <Route path='search' element={<Search />}/>
          <Route path='/games/:pk' element={<Game />}/>
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
