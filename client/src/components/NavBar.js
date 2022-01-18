import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Tooltip } from '@mui/material';
import { StyledAppBar, Search, SearchIconWrapper, StyledInputBase } from '../styles/navbarStyles';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <NavLink to='/'>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Pooja Appliances

                    </Typography>
                </NavLink>
                <Search sx={{ flexGrow: 1 }}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder='Search...' />

                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex' }}>
                    <Tooltip title="login" arrow>
                        <IconButton color='inherit' size="large">
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>

                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingBagIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </StyledAppBar>

    )
}

export default NavBar
