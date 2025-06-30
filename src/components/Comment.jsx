import React from 'react';

const Comment = ({ comment }) => {
    if (!comment || comment.kind !== 't1') return null; // Ensure we only render valid comments

    const data = comment.data;
    const replies = data.replies?.data?.children;

    console.log("REPLIES FOR", data.author, replies);
    console.log('Reply for', data.author, data.replies); // Debugging log to see the comment data

    const avatar = data.author_icon_img && data.author_icon_img.startsWith('http')
        ? data.author_icon_img
        : '/default-avatar.png'; // Fallback avatar if the URL is not valid
    
    if (Array.isArray(replies) && replies.length > 0) {
        console.log(`Rendering ${replies.length} replies for`, data.author);
    }
        
    return (
        <div className="comment">
            <div className="comment-meta">
                <img
                    src={avatar}
                    alt={`u/${data.author}'s avatar`}
                    className="avatar"
                /> 
                <span className="meta-line">
                <span className="username">u/{data.author}</span>
                <span className="timestamp">
                    • {new Date(data.created_utc * 1000).toLocaleString()}
                    </span> 
                </span>
            </div>
            <p>{data.body}</p>

            {Array.isArray(replies) && replies.length > 0 && ( 
                <div className="replies">
                    {replies
                        .filter((reply) => reply.kind === 't1') // Ensure we only render valid replies
                        .sort((a, b) => b.data.score - a.data.score) // Sort replies by score
                        .slice(0, 5) // Limit to 5 replies
                        .map((reply) => (
                        <Comment key={reply.data?.id || Math.random()} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Comment;
