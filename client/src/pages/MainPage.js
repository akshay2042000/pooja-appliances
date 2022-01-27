import React from 'react'
import { Link, Outlet } from "react-router-dom";


const MainPage = () => {
    return (
        <div>
            <h1>main page</h1>
            <Outlet />
        </div>
    )
}

export default MainPage
