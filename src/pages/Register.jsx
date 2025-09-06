import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import styles from '../styles/Register.module.css'; // Import the CSS file

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit = async (data) => {

        try {
            setLoading(true);
            setMessage('');
            const formData = new FormData();   //a javascript object which can hold text as well as binary(image,pdf,video,etc)
            formData.append('username', data.username);
            formData.append('fullName', data.fullName);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('avatar', data.avatar[0]);
            if (data.coverImage?.[0]) {
                formData.append("coverImage", data.coverImage[0]);
            }

            const res = await axios.post(
                'http://localhost:8000/api/v1/users/register',
                formData,
                {headers: {"Content-Type": "multipart/form-data"}} //multipart form-data tells backend to expect text + files

            )
            setMessage(res.data.message || "User registered successfully!");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerCard}>
                <h2 className={styles.registerTitle}>Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
                    {/* Full Name and Username Row */}
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                {...register("fullName", {required: "Full name is required"})}
                                className={styles.inputField}
                            />
                            {errors.fullName && <p className={styles.errorMessage}>{errors.fullName.message}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Username</label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                {...register("username", {required: "Username is required"})}
                                className={styles.inputField}
                            />
                            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}
                        </div>
                    </div>

                    {/* Email and Password Row */}
                    <div className={styles.formRow}>
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", {required: "Email is required"})}
                                className={styles.inputField}
                            />
                            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {required: "Password is required"})}
                                className={styles.inputField}
                            />
                            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Avatar (required)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("avatar", {required: "Avatar is required"})}
                            className={styles.fileInput}
                        />
                        {errors.avatar && <p className={styles.errorMessage}>{errors.avatar.message}</p>}
                    </div>

                    {/* Cover Image */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Cover Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("coverImage")}
                            className={styles.fileInput}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {message && (
                    <p className={`${styles.messageText} ${message.includes('successfully') ? styles.success : styles.error}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );

}

export default Register;