import React from 'react'
import Container from '@mui/material/Container'
import { Grid, Typography, Box } from '@mui/material'
import FooterLogoComponent from './FooterLogoComponent'
import FooterAddress from './FooterAddress'
import FooterLinks from './FooterLinks'

const Footer = () => {
    return (
        <>
            <Box sx={{ bgcolor: 'primary.main', width: '100%', padding: 4 }}>
                <Grid container spacing={3} sx={{ color: 'grey.400', my: 2, width: '100%', mx: '0'}}  >
                    <Grid item xs={12} sm={6} md={4} >
                        <FooterLogoComponent />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}  >
                        <FooterLinks />
                    </Grid>
                    <Grid item xs={12} md={4} >
                        <FooterAddress />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}

export default Footer
