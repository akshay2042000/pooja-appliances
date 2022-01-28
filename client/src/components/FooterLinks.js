import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';


const FooterLinks = () => {
    return (
        <Box sx={{
            maxWidth: 'fit-content', mx: {
                sm: 'auto',
            }
        }}>

            <Typography variant='h5' mb={3}>Quick links</Typography>
            <Stack
                direction="column"
                justifyContent="center"
            >
                <Link to='/pooja'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Pooja Appliances</Typography>
                </Link>
                <Link to='/creative'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Creative Appliances</Typography>
                </Link>
                <Link to=''>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Home</Typography>
                </Link>
                <HashLink smooth to='..#categories'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Categories</Typography>
                </HashLink>
                <Link to='products'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Products</Typography>
                </Link>
                <Link to='/login'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Login</Typography>
                </Link>
                <Link to='cart'>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Cart</Typography>
                </Link>

            </Stack>
        </Box>
    )
}

export default FooterLinks
