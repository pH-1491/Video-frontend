import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WatchHistory.css";

const WatchHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchWatchHistory = async () => {
            if (!token) {
                setError("Unauthorized: Please log in first.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/history`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setHistory(res.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch watch history");
            } finally {
                setLoading(false);
            }
        };

        fetchWatchHistory();
    }, [token]);

    if (loading) {
        return (
            <div className="watch-history-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading watch history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="watch-history-container">
                <div className="error-state">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="watch-history-container">
            <div className="watch-history-header">
                <h2>Watch History</h2>
                <p className="history-subtitle">{history.length} videos watched</p>
            </div>

            {history.length === 0 ? (
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p>No videos watched yet.</p>
                    <p className="empty-subtext">Start watching videos to build your history</p>
                </div>
            ) : (
                <div className="video-grid">
                    {history.map((video) => (
                        <div key={video._id} className="video-card">
                            <div className="thumbnail-wrapper">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="thumbnail"
                                />
                                <span className="duration-badge">{video.duration} mins</span>
                            </div>
                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="video-owner">{video.owner?.fullName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WatchHistory;