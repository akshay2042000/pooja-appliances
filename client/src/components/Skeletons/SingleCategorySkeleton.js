import { Card, CardActionArea, CardMedia, Skeleton, Typography } from '@mui/material'
import React from 'react'

const SingleCategorySkeleton = () => {
    return (
        <Card variant='elevation' elevation={10} sx={{
            position: 'relative',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease-in-out',

            }
        }}>
            <CardActionArea>
                <Skeleton variant="rectangular" height={300} />
            </CardActionArea>
            <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'common.white', fontWeight: 1000, cursor: 'pointer' }} >
                <Skeleton variant='text' sx={{ width: [70, 100, 150] , height: 50}} />
            </Typography>
        </Card>
    )
}

export default SingleCategorySkeleton
