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
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const NavBar = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const cartState = useSelector(state => state.cartState);
    const count = cartState[appliances]?.count || 0;

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <NavLink to={`/${appliances}`} >
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
                        <NavLink to='/login'>
                            <IconButton color='inherit' size="large">
                                <AccountCircle />
                            </IconButton>
                        </NavLink>
                    </Tooltip>
                    <NavLink to={`/${appliances}/cart`}>
                        <IconButton size="large" color="inherit">
                            <Badge badgeContent={count} color="secondary">
                                <ShoppingBagIcon />
                            </Badge>
                        </IconButton>
                    </NavLink>
                </Box>
            </Toolbar>
        </StyledAppBar >

    )
}

export default NavBar
