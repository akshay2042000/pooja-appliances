import { Box, Item, Link, Stack, Typography } from '@mui/material'
import React from 'react'

const FooterLinks = () => {
    return (
        <Box sx={{maxWidth:'fit-content', mx:'auto'}}>

            <Typography variant='h5' mb={3}>Quick links</Typography>
            <Stack
                direction="column"
                justifyContent="center"
            >
                <Link variant="body1" underline='hover' color='inherit' href='/'>Home</Link>
                <Link variant="body1" underline='hover' color='inherit' href='#categories'>Categories</Link>
                <Link variant="body1" underline='hover' color='inherit' href='/products'>Products</Link>
                <Link variant="body1" underline='hover' color='inherit' href='/login'>Login</Link>
                <Link variant="body1" underline='hover' color='inherit' href='/cart'>Cart</Link>
                <Link variant="body1" underline='hover' color='inherit' href='bill'>Billing</Link>
            </Stack>
        </Box>
    )
}

export default FooterLinks
