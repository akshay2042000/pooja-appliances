import { Box, Grid, Typography, Container, Paper, styled, Button, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleCartItem from './SingleCartItem';
import { useNavigate } from 'react-router-dom';
import Api from '../api/index';
import Success from './Success';
import AsyncSelect from 'react-select/async';
import { useTheme } from '@mui/material/styles';


const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
    padding: theme.spacing(2, 1)
}))

const CartComponent = () => {

    const { app } = useParams()
    const cartState = useSelector(state => state.cartState);
    const cart = cartState[app];
    const { currentUser } = useSelector(state => state.userState);
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();

    const [selectedUser, setSelectedUser] = useState(currentUser);

    const loadOptions = async (inputValue, callback) => {
        const requestResults = [];
        const { data } = await Api.getSearchedUsers(inputValue)
        const users = data.data
        users.map(user => {
            requestResults.push({
                value: user,
                label: user.username
            })
        })
        callback(requestResults)
    }

    const handleUserChange = (value, e) => {
        const user = value.value
        setSelectedUser(user)
    }


    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: theme.shape.borderRadius,
            marginBottom: theme.spacing(1),
            '&:hover': {
                cursor: 'pointer',
            },
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
        }),
        menu: (provided, state) => ({
            ...provided,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
            zIndex: 10
        }),

        input: (provided, state) => ({
            ...provided,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? theme.palette.secondary.light : isSelected ? theme.palette.primary.main : '',
                color: isFocused ? theme.palette.primary.contrastText : isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                cursor: isFocused &&
                    'pointer'
            };
        },
    }

    const placeOrder = async () => {
        if (currentUser) {
            let user;
            if (currentUser.isAdmin) {
                user = selectedUser
            } else {
                user = currentUser
            }
            const { data } = await Api.placeOrder({
                user: user,
                app: app,
                items: cart.items.map(item => {
                    return {
                        product: item._id,
                        quantity: item.quantity,
                        size: item.size,
                        color: item.color,
                        unit: item.unit
                    }
                }),
                total: cart.total,
            })
            setOrder(data.data)
            setOpen(true);
            // clear the cart

        } else {
            // navigate to login page
            navigate('../login')
        }
    }

    return (
        <>
            <Container fixed disableGutters={true}>
                <Grid sx={{ my: 8 }} container >
                    <Grid item xs={12} md={8} sx={{ p: 1 }}>
                        <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {
                                cart.items.map((item, i) => (
                                    <SingleCartItem key={i} index={i} />
                                ))
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ p: 1 }} >
                        <Paper variant='outlined' sx={{ mb: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Typography variant="h6" mb={1} color="initial">Price Details</Typography>
                            <Divider variant="middle" sx={{ my: 1, width: '100%' }} />
                            <StyledBox >
                                <Typography variant="body1" color="initial" >Total</Typography>
                                <Typography variant="body1" color="initial">{cart.total}</Typography>
                            </StyledBox>
                            <StyledBox >
                                <Typography variant="body1" color="initial" >Gst</Typography>
                                <Typography variant="body1" color="initial">₹120 <Typography variant="caption" component='span' color="initial">(10%)</Typography> </Typography>
                            </StyledBox>
                            <Divider variant="middle" sx={{ my: 1, width: '100%' }} />
                            <StyledBox >
                                <Typography variant="h6" color="initial" >Sub Total</Typography>
                                <Typography variant="h6" color="initial">₹1320</Typography>
                            </StyledBox>
                        </Paper>

                        {
                            currentUser && currentUser.isAdmin &&
                            (
                                <AsyncSelect
                                    styles={customStyles}
                                    name='billingUser'
                                    loadOptions={loadOptions}
                                    cacheOptions
                                    placeholder='Select any other user'
                                    defaultValue={{ label: currentUser.username, value: currentUser }}
                                    onChange={(e, value) => {
                                        handleUserChange(e, value)
                                    }}
                                />
                            )

                        }

                        <Button variant="contained" color="primary" sx={{ p: 2, minWidth: '50%' }} onClick={placeOrder}>
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Success open={open} order={order} setOpen={setOpen} />

        </>
    )
}

export default CartComponent
