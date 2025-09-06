import { useForm } from "react-hook-form";
import axios from "axios";
import styles from '../styles/Login.module.css';


const Login = () => {
    const {
        register,        //connects input to the form
        handleSubmit,    //runs validation + calls your submit function
        reset,           //clears/resets the form
        formState: { errors },  //shows what went wrong in validation
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/v1/users/login',
                {
                    username: data.username,
                    password: data.password,
                    email: data.email,
                },
                {
                    withCredentials: true   //accepts cookies
                }
            );
            console.log("Response:", res.data);
            alert("Login successful!");
            window.location.href = "/dashboard";
        } catch (e) {
            console.error(e)
            if (e.response?.status === 404) {
                alert("User not found, please register first!");
                window.location.href = "/register";
            } else if (e.response?.status === 401) {
                alert("Invalid password!");
            } else {
                alert(e.response?.data?.message || "Login failed");
            }
        }
        reset();
    }
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2 className={styles.loginTitle}>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                    {/* Email / Username */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Email / Username</label>
                        <input
                            type="text"
                            placeholder="Enter email or username"
                            {...register("email")}
                            className={styles.inputField}
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className={styles.inputField}
                        />
                        {errors.password && (
                            <p className={styles.errorMessage}>{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

}

export default Login;