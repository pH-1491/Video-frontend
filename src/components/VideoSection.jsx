import React, { useEffect, useState } from "react";

const VideoSection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchVideos = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token"); // or however you store the JWT

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

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Videos</h2>

            {videos.length === 0 ? (
                <p className="text-gray-600">No videos available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video) => (
                        <div
                            key={video._id}
                            className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                        >
                            {/* Thumbnail */}
                            <img
                                src={video.thumbnail || "/default-thumbnail.jpg"}
                                alt={video.title}
                                className="w-full h-40 object-cover"
                            />

                            {/* Content */}
                            <div className="p-3">
                                <h3 className="font-semibold text-lg truncate">
                                    {video.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    {video.description}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Uploaded by: {video?.user?.username || "Unknown"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="self-center">
          Page {page} of {totalPages}
        </span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default VideoSection;
