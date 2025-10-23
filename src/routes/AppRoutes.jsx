import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Welcome from "../pages/Welcome.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import UploadVideo from "../pages/Upload.jsx";
import Profile from "../pages/Profile.jsx";
import Settings from "../pages/Settings.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Welcome />,

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
        path: "/home",
        element: <Home />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/upload",
        element: <UploadVideo />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/settings",
        element: <Settings />,
    }

]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
