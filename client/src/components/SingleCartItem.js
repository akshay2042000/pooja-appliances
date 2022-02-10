import { Box, Button, Card, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartItemForm from './CartItemForm';
import { addItem, removeItem } from '../redux/cartSlice';


const SingleCartItem = ({ item }) => {

    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const cartState = useSelector(state => state.cartState);
    const cart = cartState[appliances];
    const dispatch = useDispatch();



    const removeFromCart = () => {
        dispatch(removeItem({ ...item }))
    }

    return (
        <>
            <Box sx={{
                borderBottom: '1px solid #ebebeb', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], alignItems: ['start', 'center'] }}>
                    <Card variant='' sx={{
                        px: [1, 3], py: [3], display: 'flex'
                    }}>
                        <Link to={`/${appliances}/products/${item._id}`} >
                            <CardMedia
                                sx={{ borderRadius: 1, width: 100, height: '100%' }}
                                component="img"
                                image={item.images[0].path}
                                alt="Live from space album cover"
                            >
                            </CardMedia>
                        </Link>
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'start', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Link to={`../products/${item._id}`}>
                                <Typography gutterBottom variant="body1" fontWeight='normal' sx={{ my: 0, textTransform: 'capitalize' }} >
                                    {`${item.name} - ${item.color.name} (${item.size.val})`}
                                </Typography>
                            </Link>

                            <Typography variant="body1" color='text.primary' mt={1} fontWeight='bold'>₹{item.size.price} </Typography>
                            <Button variant="outlined" color="error" sx={{ mt: 1 }} onClick={removeFromCart}>
                                Remove
                            </Button>
                        </Box>
                    </Card>

                    <CartItemForm product={item} />


                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" color="initial">{item.quantity * item.size.price}</Typography>
                </Box>
            </Box >
        </>
    )
}

export default SingleCartItem
