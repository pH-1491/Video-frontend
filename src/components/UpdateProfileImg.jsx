import { useState } from "react";
import axios from "axios";
import styles from "../styles/UpdateProfileImg.module.css";

const UpdateProfileImg = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setMessage("");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select an image first!");
            setMessageType("error");
            return;
        }

        try {
            setLoading(true);
            setMessage("");

            const formData = new FormData();
            formData.append("avatar", file);

            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/v1/users/avatar`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    withCredentials: true,
                }
            );

            setMessage(res.data.message || "Profile image updated successfully!");
            setMessageType("success");
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Failed to update image");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.profileUpdateContainer}>
            <h2 className={styles.profileTitle}>Update Profile Image</h2>

            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    className={styles.previewImage}
                />
            )}

            <div className={styles.fileInputWrapper}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={loading}
                className={styles.uploadButton}
            >
                {loading ? "Uploading..." : "Upload"}
            </button>

            {message && (
                <p className={`${styles.message} ${styles[messageType]}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default UpdateProfileImg;
