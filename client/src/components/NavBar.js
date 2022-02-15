import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, TextField, Tooltip } from '@mui/material';
import { StyledAppBar, Search, SearchIconWrapper, StyledInputBase } from '../styles/navbarStyles';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import decode from 'jwt-decode';

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

    return (

        <>
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
                        <StyledInputBase placeholder='Search...' value={searchKey} onClick={handleClickOpen} onChange={handleClickOpen} />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
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
                                            <NavLink to={`/${appliances}/login`}>
                                                <IconButton color='inherit' size="large">
                                                    <AccountCircle />
                                                </IconButton>
                                            </NavLink>
                                        </Tooltip>
                                    </>
                                )

                        }
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
