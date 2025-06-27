import React from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (e.key === 'Enter' && query.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery(''); // Clear the input after search
        }
    };

    return (
        <header className="topbar">
            <h1 className="logo">Reddit Client</h1>
            
            <div className="topbar-controls">
                <input type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
                <select className="subreddit-select">
                    <option value="popular">r/popular</option>
                    <option value="reactjs">r/reactjs</option>
                    {/* later: map subreddit options dynamically */}
                </select>
                <button className="dark-toggle">🌙</button>
            </div>
        </header>
    );
};

export default TopBar;
// Note: This component is a placeholder for the top bar of the application.
