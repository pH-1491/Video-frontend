import { useState } from "react";
import axios from "axios";
import styles from "../styles/UpdateEmail.module.css";

const UpdateEmail = () => {
    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleUpdate = async () => {
        if (!newEmail) {
            setMessage("Please enter a new email");
            setMessageType("error");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.patch(
                "http://localhost:8000/api/v1/users/email",
                { newEmail },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setMessage(res.data.message || "Email updated successfully!");
            setMessageType("success");
            setNewEmail("");
        } catch (err) {
            console.error(err);
            setMessage(err.response?.data?.message || "Failed to update email");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.updateEmailContainer}>
            <h2 className={styles.title}>Update Email</h2>

            <input
                type="email"
                placeholder="Enter new email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className={styles.emailInput}
            />

            <button
                onClick={handleUpdate}
                disabled={loading}
                className={styles.updateButton}
            >
                {loading ? "Updating..." : "Update Email"}
            </button>

            {message && (
                <p
                    className={`${styles.message} ${
                        messageType === "success" ? styles.success : styles.error
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default UpdateEmail;
