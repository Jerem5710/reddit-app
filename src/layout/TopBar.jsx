import React from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit } from '../features/subreddit/subredditSlice'; // Assuming you have a subredditSlice defined

const TopBar = () => {
    const [query, setQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); // Placeholder for dark mode toggle
    // This can be expanded to actually toggle dark mode in your app
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector((state) => state.subreddit.selectedSubreddit);
    //const location = useLocation();

    // Debugging effect to log the selected subreddit
    // This can be useful to see if the subreddit changes correctly
    useEffect(() => {
        console.log('Selected subreddit (from Redux):', selectedSubreddit);
    }, [selectedSubreddit]);
    
    /*useEffect(() => {
        // Force reflow when route changes
        window.dispatchEvent(new Event('resize'));
    }, [location.pathname]);*/

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

    const handleSubredditChange = (e) => {
        dispatch(setSelectedSubreddit(e.target.value));
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            dispatch(setSelectedSubreddit(inputValue.trim()));
            setInputValue('');
        }
    };

    return (
        <header className="topbar">
            <div className="topbar-inner">
            <div className="logo-section">
                <img src="/reddit-logo.svg" alt="Reddit Logo" className="reddit-logo" />
                <h1 className="logo-text">Reddit Client</h1>
            </div>          
            <div className="topbar-controls">
                <input type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    />
                    
                    <form onSubmit={handleInputSubmit} className="subreddit-form">
                    <input
                    type="text"
                    className="subreddit-input"
                    placeholder="Enter subreddit"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
                    </form>

                <select
                    className="subreddit-select"
                    value={selectedSubreddit}
                    onChange={handleSubredditChange}
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
            </div>
        </header>
    );
};

export default TopBar;
// Note: This component is a placeholder for the top bar of the application.
