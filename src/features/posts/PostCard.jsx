import React from 'react';
import { Link } from 'react-router-dom';
//import './PostCard.css'; // optional if you want scoped styles

const PostCard = ({ post }) => {

    return (
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
                                <div className="post-actions">
                                        <a
                                            href={`https://www.reddit.com${post.permalink}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="reddit-link"
                                            title="View on Reddit"
                                        >
                                    View on Reddit ↗
        
                                        </a>
        
                                <div className="vote-controls">
                                        <button className="vote-button upvote" aria-label="Upvote this post" title="Upvote this post">▲</button>        
                                        <span className="post-score">{post.score}</span>
                                        <button className="vote-button downvote" aria-label="Downvote this post" title="Downvote this post">▼</button>
                                </div>
                                        
                                <span className="post-date" title="Posted on">
                                            {new Date(post.created_utc * 1000).toLocaleString()}
                                        </span>
        
                                        <Link
                                            to={`/r/${post.subreddit}/comments/${post.id}`}
                                            className="comment-link"
                                            title="View comments"
                                        >
                                            <img 
                                                src="/comment-bubble.png"
                                                alt="Comments"
                                                className="comment-icon"
                                            />
                                            {post.num_comments}
                                        </Link>
        
                                    </div>
                                </div>
                                {/*Themed divider between posts*/}
                                <hr className="post-divider" />
                            </React.Fragment>
    );
};

export default PostCard;
