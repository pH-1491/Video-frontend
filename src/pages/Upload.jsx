import { useState } from "react";
import axios from "axios";
import { Film, Camera, Upload } from "lucide-react";
import '../styles/Upload.css';


export default function UploadVideoForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !videoFile || !thumbnail) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("videoFile", videoFile);
        formData.append("thumbnail", thumbnail);

        try {
            setUploading(true);

            const res = await axios.post(
                "http://localhost:8000/api/videos/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            alert("Video uploaded successfully!");
            console.log("Cloudinary URL:", res.data.data.videoFile);


            setTitle("");
            setDescription("");
            setVideoFile(null);
            setThumbnail(null);
        } catch (error) {
            console.error(error);
            alert(
                error.response?.data?.message || "Video upload failed. Try again!"
            );
        } finally {
            setUploading(false);
        }
    };


    return (
        <div className="min-h-screen-custom bg-gradient-custom flex-center p-4">
            <div className="container-max">
                {/* Header */}
                <div className="header-section">
                    <div className="header-title-wrapper">
                        <Film className="header-icon" />
                        <h1 className="header-title">Upload Video</h1>
                    </div>
                    <p className="header-subtitle">Share your content with the world</p>
                </div>

                {/* Form Container */}
                <div className="form-container-custom">
                    <div onSubmit={handleSubmit} className="form-wrapper">
                        {/* Title */}
                        <div className="form-group">
                            <label className="form-label">Video Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="form-input"
                                placeholder="Enter an engaging video title"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-textarea"
                                placeholder="Write a compelling description for your video"
                                required
                            />
                        </div>

                        {/* File Uploads Grid */}
                        <div className="files-section">
                            <label className="files-label">Files</label>
                            <div className="file-uploads-grid">
                                {/* Video File */}
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => setVideoFile(e.target.files[0])}
                                        className="file-input-hidden"
                                        id="video-input"
                                        required
                                    />
                                    <label
                                        htmlFor="video-input"
                                        className="file-input-label video-label"
                                    >
                                        <Film className="file-icon video-icon" />
                                        <span className="file-text">
                      {videoFile ? videoFile.name : 'Choose video'}
                    </span>
                                    </label>
                                </div>

                                {/* Thumbnail File */}
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setThumbnail(e.target.files[0])}
                                        className="file-input-hidden"
                                        id="thumbnail-input"
                                        required
                                    />
                                    <label
                                        htmlFor="thumbnail-input"
                                        className="file-input-label thumbnail-label"
                                    >
                                        <Camera className="file-icon thumbnail-icon" />
                                        <span className="file-text">
                      {thumbnail ? thumbnail.name : 'Choose thumbnail'}
                    </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="submit-button"
                        >
                            <Upload className="submit-icon" />
                            <span>{uploading ? 'Uploading...' : 'Upload Video'}</span>
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="footer-text">
                    Supported formats: MP4, WebM, Ogg for video • PNG, JPG, WEBP for thumbnail
                </p>
            </div>
        </div>
    );
}
