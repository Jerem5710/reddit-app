import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from './app/routes.js'
import TopBar from './layout/TopBar'
import PostList from './features/posts/PostList.jsx'

function App() {
  return (
    <div className="app-wrapper">
    <Router>
      <TopBar />
      <Routes>
        <Route path={ROUTES.home} element={<PostList />} />
        <Route path={ROUTES.search} element={<div>Search Results</div>} />
        <Route path={ROUTES.postDetail()} element={<div>Post Detail</div>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App
