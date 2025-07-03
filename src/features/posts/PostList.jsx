import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';
import './PostList.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';
import PostCard from './PostCard.jsx'; // Importing PostCard component for individual post rendering

const PostList = () => {
    const dispatch = useDispatch();
    const selectedSubreddit = useSelector((state) => state.subreddit.selectedSubreddit);
    const { posts, status, error } = useSelector((state) => state.posts);
    // Fetch posts when the component mounts or when the selected subreddit changes
    // This will ensure that the posts are fetched for the selected subreddit
    // and the component re-renders with the new data.

    useEffect(() => {
        console.log('Fetching posts for subreddit:', selectedSubreddit);
        // Dispatch the fetchPosts action with the selected subreddit
        dispatch(fetchPosts(selectedSubreddit));
    }, [dispatch, selectedSubreddit]);

    if (status === 'loading') {
        return <p>Loading posts...</p>;
    }
    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="post-feed">
            <div className="post-list">
                <h2 className="subreddit-title" title="Posts from subreddit">Posts from r/{selectedSubreddit}</h2>
                {posts.map((post) => (
                <PostCard post={post} key={post.id} />
            ))}
            </div>
        </div>
    )
};

export default PostList;