import React from 'react'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router-dom'



const Layout = () => {
    return (
        <div>
            <Typography variant="h1" color="initial">NAVBAR</Typography>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
