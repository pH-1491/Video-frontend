import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";


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
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            {...register("fullName", {required: "Full name is required"})}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            {...register("username", {required: "Username is required"})}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", {required: "Email is required"})}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", {required: "Password is required"})}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    {/* Avatar */}
                    <div>
                        <label className="block text-sm font-medium">Avatar (required)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("avatar", {required: "Avatar is required"})}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar.message}</p>}
                    </div>

                    {/* Cover Image */}
                    <div>
                        <label className="block text-sm font-medium">Cover Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("coverImage")}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
            </div>
        </div>
    );

}

export default Register;