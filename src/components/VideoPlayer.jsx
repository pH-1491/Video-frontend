import React, { useState } from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onBack }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([
        { id: 1, author: 'Sarah', avatar: 'SA', text: 'This is amazing! Really helped me understand the concept better.', time: '2 days ago', likes: 0 },
        { id: 2, author: 'Mike ', avatar: 'MK', text: 'Great quality content. Keep it up!', time: '1 week ago', likes: 0 },
        { id: 3, author: 'Emma ', avatar: 'EM', text: 'Could you make a follow-up video on advanced techniques?', time: '1 week ago', likes: 0 }
    ]);
    const [newComment, setNewComment] = useState('');

    const handleLike = () => {
        if (liked) {
            setLiked(false);
            setLikes(likes - 1);
        } else {
            setLiked(true);
            setLikes(likes + 1);
            if (disliked) {
                setDisliked(false);
                setDislikes(dislikes - 1);
            }
        }
    };

    const handleDislike = () => {
        if (disliked) {
            setDisliked(false);
            setDislikes(dislikes - 1);
        } else {
            setDisliked(true);
            setDislikes(dislikes + 1);
            if (liked) {
                setLiked(false);
                setLikes(likes - 1);
            }
        }
    };

    const handleSubscribe = () => {
        setSubscribed(!subscribed);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                author: 'You',
                avatar: 'YO',
                text: newComment,
                time: 'Just now',
                likes: 0
            };
            setComments([comment, ...comments]);
            setNewComment('');
        }
    };

    return (
        <div className="video-player-container">
            <div className="video-player-wrapper">
                {onBack && (
                    <button onClick={onBack} className="back-button">
                        <span className="back-arrow">←</span>
                        <span>Back to videos</span>
                    </button>
                )}

                <div className="video-layout">
                    <div className="main-content">
                        <div className="video-container">
                            {video?.videoFile ? (
                                <video
                                    controls
                                    className="video-element"
                                    poster={video?.thumbnail}
                                >
                                    <source src={video.videoFile} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <div className="video-placeholder">
                                    <div className="placeholder-content">
                                        <div className="play-button-placeholder">
                                            <div className="play-icon"></div>
                                        </div>
                                        <p className="placeholder-text">Video Player Placeholder</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="video-info">
                            <h1 className="video-title">
                                {video?.title || 'Complete Guide to Modern Web Development'}
                            </h1>
                            <div className="video-meta">
                                <span className="video-stats">2.4M views • 3 days ago</span>

                                <div className="action-buttons">
                                    <div className="like-dislike-group">
                                        <button
                                            onClick={handleLike}
                                            className={`action-btn like-btn ${liked ? 'active' : ''}`}
                                        >
                                            <span className="icon">👍</span>
                                            <span className="count">{likes.toLocaleString()}</span>
                                        </button>
                                        <div className="divider"></div>
                                        <button
                                            onClick={handleDislike}
                                            className={`action-btn dislike-btn ${disliked ? 'active' : ''}`}
                                        >
                                            <span className="icon">👎</span>
                                        </button>
                                    </div>

                                    <button className="action-btn share-btn">
                                        <span className="icon">↗</span>
                                        <span>Share</span>
                                    </button>

                                    <button className="action-btn more-btn">
                                        <span className="icon">⋯</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="channel-info">
                            <div className="channel-content">
                                <div className="channel-left">
                                    <div className="channel-avatar">
                                        {video?.user?.username?.[0]?.toUpperCase() || 'TC'}
                                    </div>
                                    <div className="channel-details">
                                        <h3 className="channel-name">{video?.user?.username || 'Tech Channel'}</h3>
                                        <p className="subscriber-count">890K subscribers</p>
                                        <p className="channel-description">
                                            {video?.description || 'Learn web development, coding tutorials, and tech tips. New videos every week!'}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSubscribe}
                                    className={`subscribe-btn ${subscribed ? 'subscribed' : ''}`}
                                >
                                    {subscribed && <span className="bell-icon">🔔</span>}
                                    {subscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            </div>
                        </div>

                        <div className="comments-section">
                            <h3 className="comments-title">{comments.length} Comments</h3>

                            <div className="add-comment">
                                <div className="comment-avatar user-avatar">YO</div>
                                <div className="comment-input-wrapper">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add a comment..."
                                        className="comment-input"
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                    />
                                    <div className="comment-actions">
                                        <button
                                            onClick={() => setNewComment('')}
                                            className="cancel-btn"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddComment}
                                            disabled={!newComment.trim()}
                                            className="submit-btn"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="comments-list">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <div className="comment-avatar">{comment.avatar}</div>
                                        <div className="comment-content">
                                            <div className="comment-header">
                                                <span className="comment-author">{comment.author}</span>
                                                <span className="comment-time">{comment.time}</span>
                                            </div>
                                            <p className="comment-text">{comment.text}</p>
                                            <div className="comment-actions-row">
                                                <button className="comment-action-btn">
                                                    <span className="icon-small">👍</span>
                                                    <span>{comment.likes}</span>
                                                </button>
                                                <button className="comment-action-btn">
                                                    <span className="icon-small">👎</span>
                                                </button>
                                                <button className="comment-action-btn">Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="sidebar">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="suggested-video">
                                <div className="suggested-thumbnail"></div>
                                <div className="suggested-info">
                                    <h4 className="suggested-title">
                                        Related Video Title {i}
                                    </h4>
                                    <p className="suggested-channel">Channel Name</p>
                                    <p className="suggested-stats">1.2M views • 2 days ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;