import { useForm } from "react-hook-form";
import axios from "axios";

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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email / Username */}
                    <div>
                        <label className="block text-gray-700">Email / Username</label>
                        <input
                            type="text"
                            placeholder="Enter email or username"
                            {...register("email")}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );

}


export default Login;