import { Link, Typography } from '@mui/material'
import React from 'react'

const FooterAddress = () => {
    return (
        <>
            <Typography variant='h5' mb={3}>Contact Us</Typography>
            <Typography variant="body1" mb={3}> Shop No. 12, Sector 10A <br /> Gurugram 122001, Haryana <br /> India </Typography>
            <Link variant="body1"  underline='hover' color='inherit' href="mailto:someone@example.com" >Email: pooja.appliances@gmail.com</Link>
            <br />
            <Link variant="body1"  underline='hover' color='inherit' href="tel:+4733378901" >Phone: +91 971815010</Link>

        </>
    )
}

export default FooterAddress
