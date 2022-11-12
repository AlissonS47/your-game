import './App.css'

import { Outlet } from "react-router-dom"

import ScrollToTop from './helpers/ScrollToTop'


function App() {

  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  )
}

export default App
