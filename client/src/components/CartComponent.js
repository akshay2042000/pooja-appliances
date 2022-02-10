import { Box, Grid, Typography, Container, Paper, styled, Button, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleCartItem from './SingleCartItem';



const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
    padding: theme.spacing(2, 1)
}))

const CartComponent = () => {

    const { app } = useParams()
    const cartState = useSelector(state => state.cartState);
    const cart = cartState[app];


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

                        <Button variant="contained" color="primary" sx={{ p: 2, minWidth: '50%' }}>
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </Container>

        </>
    )
}

export default CartComponent
