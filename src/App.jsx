import React from "react";
import { Outlet } from "react-router-dom";
import Welcome from "./pages/Welcome.jsx";



const App = () => {
    return (
        <div>
            <Welcome />
            <Outlet />



        </div>
    );
};

export default App;
