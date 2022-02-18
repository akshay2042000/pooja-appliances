import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'
import NavBar from '../components/NavBar'
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system'
import { IconButton } from '@mui/material'
const drawerWidth = 240;


const AdminPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (

        <div>
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <NavBar />
            <Box className="content" sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px`, position: 'relative' },
            }}>

                <Box sx={{
                    height: '50px',
                    display: { md: 'none' }
                }}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            display: { md: 'none' }, position: 'fixed', backgroundColor: 'secondary.main', top: '90px', left: '30px', zIndex: '1',
                            color: 'secondary.contrastText',
                            '&:hover': {
                                backgroundColor: 'secondary.dark',
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Outlet />
            </Box>
        </div>
    )
}

export default AdminPage
