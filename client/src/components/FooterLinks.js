import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from 'react-redux';

const FooterLinks = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;

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
                <Link to={`/${appliances}`}>
                    <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Home</Typography>
                </Link>
                {
                    appliances !== '' && (
                        <>
                            <HashLink smooth to={`/${appliances}#categories`}>
                                <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Categories</Typography>
                            </HashLink>
                            <Link to={`/${appliances}/products`}>
                                <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Products</Typography>
                            </Link>
                            <Link to={`/${appliances}/cart`}>
                                <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Cart</Typography>
                            </Link>
                            <Link to={`/${appliances}/login`}>
                                <Typography variant="body1" color='inherit' sx={{ '&:hover': { textDecoration: 'underline' } }}>Login</Typography>
                            </Link>
                        </>
                    )

                }
            </Stack>
        </Box>
    )
}

export default FooterLinks
