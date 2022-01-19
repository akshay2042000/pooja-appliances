import { Box, Paper, Typography, Button } from '@mui/material'
import React from 'react'

const HomeCard = ({ heading }) => {
    return (
        <Box sx={{
            bgcolor: 'secondary.main',
            minHeight: 100,
            borderRadius: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
            my: 2,
            mx: 1,
            backdropFilter: 'blur(10px) saturate(180%)',
            opacity: 0.7,
            border: '1px solid rgba(255, 255, 255, 0.125)',
            '&:hover': {
                transform: 'scale(1.05) ',
                transition: 'all 0.3s ease-in-out',
                opacity: 1,
            }
        }}>
            <Box color="primary">
                <Typography sx={{ textTransform: 'uppercase', textAlign: 'center', fontWeight: 'bolder' }} variant="h2" color='common.white'>{heading}</Typography>
            </Box>

        </Box>
    )
}

export default HomeCard
