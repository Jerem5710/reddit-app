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
    const [isSearching, setIsSearching] = useState(false); // Placeholder for search state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector((state) => state.subreddit.selectedSubreddit);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
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
    
    /*const handleSearch = (e) => {
        e.preventDefault();
        if (e.key === 'Enter' && query.trim() !== '') {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`)
            setQuery(''); // Clear the input after search
        }
    };*/

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

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setIsSearching(true); //trigger loading state
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
            setTimeout(() => setIsSearching(false), 2000) // Simulate fetch delay
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

                <form onSubmit={handleSearchSubmit} className="search-container">   
                    <input
                        type="text"
                        placeholder="Search subreddit..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        aria-label="search subreddit"
                    />
                        <button type="submit" className="search-button" aria-label="search">
                            <img src="/search-icon.png" alt="Search Icon" className="search-icon" />
                        </button>
                </form>
                    
                    <form onSubmit={handleInputSubmit} className="subreddit-container">
                        <input
                            type="text"
                            className="subreddit-input"
                            placeholder="Enter subreddit"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            aria-label="Enter subreddit"
                        />
                        <button type="submit" className="subreddit-button" aria-label="submit subreddit">
                            <img src="/search-icon.png" alt="Search Icon" className="search-icon" />
                        </button>
                    </form>


                    <div className="custom-dropdown">
                        <button className="dropdown-toggle" onClick={() => setShowDropdown((prev) => !prev)}>
                            {selectedSubreddit ? `r/${selectedSubreddit}` : 'Select Subreddit'}
                            <img src="/custom-arrow.png" alt="Toggle" className="arrow-icon" />
                        </button>

                        {showDropdown && (
                            <ul className="dropdown-menu">
                                {['popular', 'reactjs', 'webdev', 'learnprogramming'].map((sub) => (
                                    <li
                                        key={sub}
                                        onClick={() => {
                                            dispatch(setSelectedSubreddit(sub));
                                            setShowDropdown(false);
                                        }}
                                        className={`dropdown-item ${selectedSubreddit === sub ? 'active' : ''}`}
                                    >
                                        r/{sub}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                <button
                    className="dark-toggle"
                    onClick={() => setIsDarkMode((prev) => !prev)}
                >
                        <img
                            src={isDarkMode ? '/sun-icon.png' : '/moon-icon.png'}
                            alt={isDarkMode ? 'Light mode' : 'Dark mode'}
                            className="toggle-icon"
                        />
                        <span className="sr-only">
                            {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        </span>

                </button>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
// Note: This component is a placeholder for the top bar of the application.
