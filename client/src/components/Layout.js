import React from 'react'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CategoriesComp from './CategoriesComp'



const Layout = () => {
    return (
        <div>
            <NavBar/>
            <CategoriesComp/>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
