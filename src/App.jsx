import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ROUTES } from './app/routes.js'
import TopBar from './layout/TopBar'
import PostList from './features/posts/PostList.jsx'
import PostDetail from './components/PostDetail.jsx'
import SearchResults from './features/searchResults/SearchResults.jsx'

function App() {
  return (
    <div className="app-wrapper">
    <Router>
        <TopBar />
      <Routes>
        <Route path={ROUTES.home} element={<PostList />} />
        <Route path={ROUTES.search} element={<SearchResults />} />
          <Route path={ROUTES.postDetail()} element={<PostDetail />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App

// <Route path="/r/:subreddit" element={<PostList />} /> this was removed while reverting back to original layout to figure out the navigating issue
