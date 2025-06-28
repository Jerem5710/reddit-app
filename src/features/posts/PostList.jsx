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
            <div className="post-list">
                <h2 className="subreddit-title">Posts from r/{selectedSubreddit}</h2>
                {posts.map((post) => (
                <React.Fragment key={post.id}>
                <div className="post-card">
                    <h3>{post.title}</h3>
                    {/* Only show video if it's a Reddit-hosted video */}
                    {post.media?.reddit_video?.fallback_url ? (
                        <video
                            controls
                            className="post-video"
                            src={post.media.reddit_video.fallback_url}
                            aria-label={`Video for post: ${post.title}`}
                        />
                    ) : (
                    post.preview?.images?.[0]?.source?.url && (
                    <img
                        src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                        alt={post.title}
                        className="post-thumbnail"
                    />
                    )
                    )}
                    <div className="post-meta">
                        <img
                            src={post.sr_detail?.icon_img || `https://www.redditstatic.com/icon.png`}
                            alt={post.subreddit}
                            className="subreddit-avatar"
                        />
                        <span>{post.subreddit_name_prefixed}</span>
                        </div>
                    <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">
                        View on Reddit
                    </a>
                        </div>
                        {/*Themed divider between posts*/}
                        <hr className="post-divider" />
                    </React.Fragment>
            ))}
            </div>
        </div>
    )
};

export default PostList;