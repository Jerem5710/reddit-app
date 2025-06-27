import React from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
    const [query, setQuery] = useState('');
    const [subreddit, setSubreddit] = useState('popular'); // Default subreddit
    // You can later use this state to handle subreddit changes
    const [isDarkMode, setIsDarkMode] = useState(false); // Placeholder for dark mode toggle
    // This can be expanded to actually toggle dark mode in your app
    const navigate = useNavigate();

    // Debugging effect to log the selected subreddit
    // This can be useful to see if the subreddit changes correctly
    useEffect(() => {
        console.log('Selected subreddit:', subreddit);
    }, [subreddit]);

    useEffect(() => {
        // This effect can be used to apply dark mode styles globally
        const body = document.body
        if (isDarkMode) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    }, [isDarkMode]);

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
                <select
                    className="subreddit-select"
                    value={subreddit}
                    onChange={(e) => setSubreddit(e.target.value)}
                >
                    <option value="popular">r/popular</option>
                    <option value="reactjs">r/reactjs</option>
                    <option value="webdev">r/webdev</option>
                    <option value="learnprogramming">r/learnprogramming</option>
                    {/* More can be added later */}
                </select>
                <button
                    className="dark-toggle"
                    onClick={() => setIsDarkMode((prev) => !prev)}
                >
                    {isDarkMode ? '🌞' : '🌙'}
                </button>
            </div>
        </header>
    );
};

export default TopBar;
// Note: This component is a placeholder for the top bar of the application.
