import React, { useEffect, useState } from "react";
import "./VideoSection.css";

const VideoSection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchVideos = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await fetch(
                `http://localhost:8000/api/v1/videos?page=${pageNumber}&limit=8`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                }
            );

            if (!res.ok) throw new Error("Failed to fetch videos");

            const result = await res.json();

            setVideos(result?.data?.videos || []);
            setTotalPages(result?.data?.totalPages || 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos(page);
    }, [page]);

    if (loading) return <p className="loading-text">Loading videos...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="video-section">
            <div className="video-section-container">
                <h2 className="section-title">Videos</h2>

                {videos.length === 0 ? (
                    <p className="no-videos-text">No videos available</p>
                ) : (
                    <div className="video-grid">
                        {videos.map((video) => (
                            <div key={video._id} className="video-card">
                                {/* Thumbnail */}
                                <div className="thumbnail-container">
                                    <img
                                        src={video.thumbnail || "/default-thumbnail.jpg"}
                                        alt={video.title}
                                        className="video-thumbnail"
                                    />
                                    <div className="thumbnail-overlay"></div>
                                </div>

                                {/* Content */}
                                <div className="video-content">
                                    <h3 className="video-title" title={video.title}>
                                        {video.title}
                                    </h3>
                                    <p className="video-description">
                                        {video.description}
                                    </p>
                                    <p className="uploader-name">
                                        {video?.user?.username || "Unknown"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="pagination">
                    <button
                        disabled={page <= 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="pagination-btn"
                    >
                        Previous
                    </button>
                    <span className="page-info">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page >= totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="pagination-btn"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoSection;