import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsSlice';
import './PostList.css'; // Assuming you have a CSS file for styling

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
            <h2>Posts from r/{selectedSubreddit}</h2>
        <div className="post-list">
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p>{post.subreddit_name_prefixed}</p>
                    <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                        View on Reddit
                    </a>
                </div>
            ))}
            </div>
        </div>
    )
};

export default PostList;