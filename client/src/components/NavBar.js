import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Menu, MenuItem, Paper, Select, Snackbar, TextField, Tooltip } from '@mui/material';
import { StyledAppBar, Search, SearchIconWrapper, StyledInputBase } from '../styles/navbarStyles';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { fetchSearchedProducts } from '../redux/productSlice';
import LoadingComponent from './Skeletons/LoadingComponent';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { addItem } from '../redux/cartSlice';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import decode from 'jwt-decode';
import MoreIcon from '@mui/icons-material/MoreVert';

const NavBar = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const { currentUser } = useSelector(state => state.userState);
    const cartState = useSelector(state => state.cartState);
    const count = cartState[appliances]?.count || 0;
    const dispatch = useDispatch();
    let navigate = useNavigate();

    // Search bar

    const [searchKey, setSearchKey] = useState('');
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const productState = useSelector(state => state.productState);
    const { searchedProducts, searchedProductsLoading } = productState;
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSearchKey("");
        setOpen(false);
    };

    const redirect = (id) => {
        navigate(`/${appliances}/products/${id}`);
        setOpen(false);
        setSearchKey('');
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    }



    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >

            {
                currentUser ?
                    (

                        <MenuItem onClick={() => {
                            logout();
                            handleMobileMenuClose();
                        }}>
                            <IconButton color='inherit' size="large" onClick={logout}>
                                <LogoutIcon />
                            </IconButton>
                            <p>Logout</p>
                        </MenuItem>

                    )
                    :
                    (
                        <NavLink to={`/${appliances ? appliances : 'creative'}/login`}>
                            <MenuItem onClick={handleMobileMenuClose}>
                                <IconButton color='inherit' size="large" >
                                    <LoginIcon />
                                </IconButton>
                                <p>Login</p>
                            </MenuItem>
                        </NavLink>

                    )
            }

            <NavLink to={`/${appliances ? appliances : 'creative'}/cart`}>
                <MenuItem onClick={handleMobileMenuClose}>
                    <IconButton size="large" color="inherit">
                        <Badge badgeContent={count} color="secondary">
                            <ShoppingBagIcon />
                        </Badge>
                    </IconButton>
                    <p>Cart</p>
                </MenuItem>
            </NavLink>

            {
                currentUser?.isAdmin &&
                (
                    <NavLink to={`/admin`}>
                        <MenuItem onClick={handleMobileMenuClose}>
                            <IconButton color='inherit' size="large">
                                <BuildCircleIcon />
                            </IconButton>
                            <p>Admin Console</p>
                        </MenuItem>
                    </NavLink>
                )
            }

            {
                location.pathname.split('/')[1] !== 'admin' &&
                (<NavLink to={`/${appliances === 'creative' ? 'pooja' : 'creative'}`}>
                    <MenuItem onClick={handleMobileMenuClose}>
                        <IconButton color='inherit' size="large">
                            <ChangeCircleIcon />
                        </IconButton>
                        <p>Switch to {appliances === 'creative' ? 'Pooja' : 'Creative'}</p>
                    </MenuItem>
                </NavLink>)
            }

        </Menu>
    );


    useEffect(() => {
        dispatch(fetchSearchedProducts(appliances, searchKey));
    }, [searchKey])

    useEffect(() => {
        if (currentUser) {
            const decodedToken = decode(currentUser.accessToken)
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
            }
        }
    }, [location]);

    // Snackbar

    const addToCart = (product) => {
        dispatch(addItem({ ...product, quantity: 1, size: product.variants.sizes[0], color: product.variants.colors[0], unit: product.units[0], app: appliances }))
        setOpenSnackbar(true);
    }
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

    const ModalSearch = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.1),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.15),
        },
        width: '90%',
    }));
    console.log("🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 ", searchedProductsLoading)

    return (

        <>

            <StyledAppBar position="sticky" >
                <Toolbar>
                    <NavLink to={location.pathname.split('/')[1] === 'admin' ? '/admin' : `/${appliances}`} >
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
                        <StyledInputBase placeholder='Search...' value={searchKey} onClick={handleClickOpen} onChange={handleClickOpen} />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} >
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: { xs: 0, md: 4 } }}>
                        {
                            location.pathname.split('/')[1] !== 'admin' &&
                            (
                                <Button variant="outlined" color="white" onClick={() => navigate(`/${appliances === 'creative' ? 'pooja' : 'creative'}`)}>
                                    Switch to {appliances === 'creative' ? 'Pooja' : 'Creative'}
                                </Button>
                            )
                        }

                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {
                            currentUser ?
                                (
                                    <>
                                        <Tooltip title="logout" arrow>
                                            <IconButton color='inherit' size="large" onClick={logout}>
                                                <LogoutIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Tooltip title="login" arrow>
                                            <NavLink to={`/${appliances ? appliances : 'creative'}/login`}>
                                                <IconButton color='inherit' size="large">
                                                    <LoginIcon />
                                                </IconButton>
                                            </NavLink>
                                        </Tooltip>
                                    </>
                                )

                        }
                        {
                            currentUser?.isAdmin &&
                            (
                                <>
                                    <Tooltip title="Admin Console" arrow>
                                        <IconButton color='inherit' size="large" onClick={() => navigate(`/admin`)}>
                                            <BuildCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )
                        }
                        <NavLink to={`/${appliances ? appliances : 'creative'}/cart`}>
                            <IconButton size="large" color="inherit">
                                <Badge badgeContent={count} color="secondary">
                                    <ShoppingBagIcon />
                                </Badge>
                            </IconButton>
                        </NavLink>
                    </Box>



                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </StyledAppBar >
            {renderMobileMenu}

            <Dialog scroll={'body'} open={open} fullWidth={true} fullScreen={fullScreen} onClose={handleClose} sx={{
                backdropFilter: "blur(5px)",
                backgroundColor: 'rgba(111, 126, 140, 0.1)',
            }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <ModalSearch >
                        <SearchIconWrapper>
                            <SearchIcon color='secondary' />
                        </SearchIconWrapper>
                        <StyledInputBase sx={{ height: '100%' }} autoFocus placeholder='Search...' value={searchKey} onChange={(e) => {
                            setSearchKey(e.target.value)
                        }} />
                    </ModalSearch>
                    <IconButton onClick={handleClose} >
                        <CloseIcon fontSize='large' />
                    </IconButton>
                </DialogTitle>


                <DialogContent sx={{ minHeight: [, , '77vh'] }} dividers={true} >

                    {searchedProductsLoading ? <LoadingComponent /> :
                        searchedProducts.length === 0 ? searchKey === '' ? <DialogContentText>Type To Search</DialogContentText> : <DialogContentText>No results found for {searchKey}</DialogContentText> :
                            (
                                <>

                                    {
                                        searchedProducts.map((product, index) => {
                                            return (
                                                <Paper elevation={3} sx={{
                                                    display: 'flex',
                                                    my: 2,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    width: '100%',
                                                    height: '100%',
                                                    padding: 2,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(111, 126, 140, 0.1)',
                                                    }
                                                }}>
                                                    <Box onClick={(e) => redirect(product._id)} sx={{ flex: 'auto', display: 'flex', flexDirection: 'column' }}>
                                                        <Typography sx={{ textTransform: 'capitalize' }} variant='h6'>{`${product.name} - ${product.variants.colors[0].name} (${product.variants.sizes[0].val})`}</Typography>
                                                        <Typography variant='body1'>{product.company.name}</Typography>
                                                    </Box>

                                                    <Box>
                                                        <IconButton size='large'>
                                                            <KeyboardReturnIcon fontSize='medium' color='secondary' onClick={(e) => redirect(product._id)} />
                                                        </IconButton>
                                                        <IconButton size='large'>
                                                            <AddShoppingCartIcon fontSize='medium' color='secondary' onClick={(e) => addToCart(product)} />
                                                        </IconButton>
                                                    </Box>

                                                </Paper>

                                            )
                                        }
                                        )}
                                    <Snackbar
                                        open={openSnackbar}
                                        autoHideDuration={2000}
                                        onClose={handleSnackbarClose}
                                    >
                                        <Alert variant='filled' severity="success" sx={{ width: '100%' }}>
                                            Added To Cart!!
                                        </Alert>
                                    </Snackbar>
                                </>
                            )
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NavBar
