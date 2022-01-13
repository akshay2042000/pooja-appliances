import { Box, Paper, Typography, Button } from '@mui/material'
import React from 'react'

const HomeCard = ({ heading }) => {
    return (
        <Box sx={{
            bgcolor: 'secondary.main',
            minHeight: 300,
            width: '30vw',
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
        }}>
            <Box color="primary">
                <Typography sx={{ textTransform: 'uppercase' ,textAlign:'center', fontWeight:'bolder' }} variant="h2" color='common.white'>{heading}</Typography>
            </Box>

        </Box>
    )
}

export default HomeCard
