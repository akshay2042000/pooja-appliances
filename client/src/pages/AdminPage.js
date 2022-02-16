import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import NoComponentFound from '../components/NoComponentFound'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
const drawerWidth = 240;


const AdminPage = () => {
    return (

        <div>
            <Sidebar />
            <NavBar />
            <Box className="content" sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}>
                <Outlet />
            </Box>
        </div>
    )
}

export default AdminPage
