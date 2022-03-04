import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom'

const EmptyCart = () => {
    return (
        <>
            <Box sx={{ display:'flex', flexDirection:'column', justifyContent:'center', mx: 'auto', my: 'auto', textAlign: 'center', height: { xs: '350px', md:'370px', xl:'500px'} }}>
                <Typography variant="h4" fontWeight={'bold'} mb={2} color="initial">Your Cart</Typography>
                <Typography variant="body1" mb={3} color="initial">Your cart is currently empty.
                </Typography>
                <Link to='../'>
                    <Button variant='contained'>Continue Shopping <ArrowForwardIcon sx={{ ml: 2 }} /> </Button>
                </Link>
            </Box>
        </>
    )
}

export default EmptyCart
