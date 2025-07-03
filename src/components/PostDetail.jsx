import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comment from './Comment'; // Assuming you have a Comment component to render individual comments
import './PostDetail.css'; // Assuming you have a CSS file for styling the post detail view
import TopBar from '../layout/TopBar';

const PostDetail = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []); // This allows for the page to load at the top and not scroll automatically down

    const {subreddit, postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true)

    console.log('Comments loading?', loadingComments);
    console.log('Comments array length:', comments.length);

    useEffect(() => {
        setLoading(true);
        fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data[0].data.children[0].data);
                setLoading(false);
                //console.log('Fetched Reddit post data:', data);
            })
            .catch((error) => {
                console.error('Failed to fetch post details:', error);
                setLoading(false);
            });
    }, [subreddit, postId]);

    useEffect(() => {
        if (!post) return; // wait until post loads
        setLoadingComments(true);

        setTimeout(() => {
            fetch(`https://www.reddit.com${post.permalink}.json?raw_json=1`)
                .then((res) => res.json())
                .then((data) => {
                    setComments(data[1]?.data?.children || []);
                    setLoadingComments(false);
                })
                .catch((err) => {
                    console.error('Error fetching comments:', err);
                    setLoadingComments(false);
                });
        }, 800); // delay to help spinner render
    }, [post]);     

    if (loading) return <p>Loading post and comments ...</p>
    if (!post) return <p>Post not found or failed to load.</p>;

    return (
        <div className="post-detail-wrapper">
            <TopBar />
        <div className="post-feed">
        <div className="post-list">
        <div className="post-detail">
            <Link to="/" className="back-link">Back to Feed</Link>
            <h2>{post.title}</h2>
            <p>Posted by u/{post.author}</p>
            <p>{post.selftext || '(No body)'}</p>       
            <h3>Comments:</h3>   
                        {loadingComments || comments.length === 0 ? (
                            <div className="loading-state">
                                <span className="spinner" />
                                <p style={{ color: 'black' }}>Loading comments...</p> {/* Temp: make visible */}

                            </div>    
                 ) : (     
                comments.map((comment) => (
                    <Comment key={comment.data.id} comment={comment} />
                ))
            )}
        </div>
            </div>
            </div>
        </div>
    );
};

export default PostDetail;
