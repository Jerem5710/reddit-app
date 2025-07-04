import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you might need to access Redux state
import './SearchResults.css'; // Assuming you have a CSS file for styling
import PostCard from '../posts/PostCard.jsx'; // Importing PostCard component for individual post rendering

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q')?.toLowerCase();

    const allPosts = useSelector((state) => state.posts.posts); // Assuming posts are stored in Redux
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    //const { subreddit: currentSubredditParam } = useParams();

    //const selectedSubreddit = useSelector((state) => state.subreddit.selectedSubreddit);
    //const navigate = useNavigate()    

    useEffect(() => {
        if (!query || !allPosts.length) return;
        setLoading(true);
        const results = allPosts.filter(post =>
            post.title?.toLowerCase().includes(query) ||
            post.subreddit?.toLowerCase().includes(query)
        );
        setTimeout(() => {
            setFilteredPosts(results);
            setLoading(false);
        }, 800); // Slight delay to simulate loading state
    }, [query, allPosts]);

    /*useEffect(() => {
        const isOnSearch = location.pathname.startsWith('/search');
        const isOnPost = location.pathname.startsWith('/comments/');
        const isOnCorrectSubreddit = location.pathname === `/r/${selectedSubreddit}`;

        if (
            selectedSubreddit &&
            !isOnCorrectSubreddit &&
            (isOnSearch || isOnPost)
        ) {
            navigate(`/r/${selectedSubreddit}`);
        }
    }, [selectedSubreddit, location.pathname, navigate]);*/
      
    return (
        
        <div className="search-results-wrapper">
            {query ? (
                <h2 className="search-heading">Results for "{query}"</h2>
            ) : (
                <h2 className="search-heading">No query provided.</h2>
            )}

        {loading ? (
        <div className="loading-state">
            <span className="spinner" />
            <p>Searching posts...</p>
        </div>
    ) : filteredPosts.length === 0 ? (
        <div className="empty-state">
            <p>No results found for <strong>{query}</strong></p>
            <Link to="/" className="back-link">Back to Feed</Link>
        </div>
            ) : (
            <div className="post-list">
                {filteredPosts.map((post) => (
                    <PostCard post={post} key={post.id} />
                ))}
                <div style={{ textAlign: 'center', marginTop: '2rem'}}>
                    <Link to="/" className="back-link">Back to Feed</Link>
                </div>
            </div>
            )}
        </div>
    );
};

export default SearchResults;
    