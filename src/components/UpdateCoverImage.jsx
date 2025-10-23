import { useState } from "react";
import styles from "../styles/UpdateCoverImg.module.css";
import axios from "axios";

const UpdateCoverImg = () => {
    const [cover, setCover] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCover(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!cover) {
            alert("Please select a cover image first!");
            return;
        }

        const formData = new FormData();
        formData.append("coverImage", cover);

        try {
            const res = await axios.patch(
                "http://localhost:8000/api/v1/users/cover-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    withCredentials: true,
                }
            );

            alert(res.data.message || "Cover image updated successfully!");

        } catch (err) {
            console.error(err);
            alert("Something went wrong while uploading cover image.");
        }
    };

    return (
        <div className={styles.coverUpdateContainer}>
            <h2 className={styles.coverTitle}>Update Cover Image</h2>

            {preview && <img src={preview} className={styles.coverPreview} alt="cover preview" />}

            <input type="file" onChange={handleFileChange} className={styles.fileInput} />

            <button onClick={handleUpload} className={styles.uploadButton}>
                Upload
            </button>
        </div>
    );
};

export default UpdateCoverImg;
