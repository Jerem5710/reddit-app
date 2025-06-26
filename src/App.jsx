import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from './app/routes.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.home} element={<div>Home Page</div>} />
        <Route path={ROUTES.search} element={<div>Search Results</div>} />
        <Route path={ROUTES.postDetail()} element={<div>Post Detail</div>} />
      </Routes>
    </Router>
  )
}

export default App
