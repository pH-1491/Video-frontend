import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Welcome from "../pages/Welcome.jsx";

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

]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
