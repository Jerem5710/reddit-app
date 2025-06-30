import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Comment from './Comment'; // Assuming you have a Comment component to render individual comments

const PostDetail = () => {
    const {subreddit, postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.reddit.com/r/${subreddit}/comments/${postId}.json`)
            .then((res) => res.json())
            .then((data) => {
                console.log('Fetched Reddit post data:', data);
                setPost(data[0].data.children[0].data);
                setComments(data[1].data.children);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch post details:', error);
                setLoading(false);
            });
    }, [subreddit, postId]);

    if (loading) return <p>Loading post and comments ...</p>
    if (!post) return <p>Post not found or failed to load.</p>;

    return (
        <div className="post-feed">
        <div className="post-list">
        <div className="post-detail">
            <Link to="/" className="back-link">Back to Feed</Link>
            <h2>{post.title}</h2>
            <p>Posted by u/{post.author}</p>
            <p>{post.selftext || '(No body)'}</p>       
            <h3>Comments:</h3>            
                {comments.map((comment) => (
                    <Comment key={comment.data.id} comment={comment} />
                ))}
        </div>
            </div>
        </div>
    );
};

export default PostDetail;
