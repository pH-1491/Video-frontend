import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/profile/:userName",
        element: <Profile />
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};


export default AppRoutes;