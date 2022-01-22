import { Box, Grid, Typography, Container, Paper, styled, Button, Divider } from '@mui/material'
import React from 'react'
import CartItemTable from './CartItemTable';


const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
    padding: theme.spacing(2, 1)
}))



const CartComponent = () => {
    return (
        <>
            <Container fixed disableGutters={true}>
                <Grid sx={{ my: 8 }} container >
                    <Grid item xs={12} md={8} sx={{ p: 1 }}>
                        <CartItemTable/>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ p: 1 }} >
                        <Paper variant='outlined' sx={{ mb: 4, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Typography variant="h6" mb={1} color="initial">Price Details</Typography>
                            <Divider variant="middle" sx={{ my: 1, width: '100%' }} />
                            <StyledBox >
                                <Typography variant="body1" color="initial" >Total</Typography>
                                <Typography variant="body1" color="initial">₹1200</Typography>
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
