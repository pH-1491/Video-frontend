import { useState } from "react";
import axios from "axios";
import styles from "../styles/UpdatePassword.module.css"; // ✅ correct import

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "/api/v1/users/change-password",
                {
                    oldPassword,
                    newPassword,
                    confirmPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage(response.data.message || "Password changed successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(
                err.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };

    return (
        <div className={styles.updatePasswordContainer}>
            <div className={styles.updatePasswordCard}>
                <h2 className={styles.title}>Change Password</h2>
                <form onSubmit={handleChangePassword} className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                        <label>Old Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Change Password
                    </button>
                </form>

                {message && (
                    <p className={`${styles.message} ${styles.success}`}>{message}</p>
                )}
                {error && (
                    <p className={`${styles.message} ${styles.error}`}>{error}</p>
                )}
            </div>
        </div>
    );
};

export default UpdatePassword;
