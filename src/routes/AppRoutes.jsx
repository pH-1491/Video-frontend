import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Welcome from "../pages/Welcome.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import UploadVideo from "../pages/Upload.jsx";


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
        path: "/dashboard/:userName",
        element: <Dashboard />,
    },
    {
        path: "/upload",
        element: <UploadVideo />,
    }

]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
