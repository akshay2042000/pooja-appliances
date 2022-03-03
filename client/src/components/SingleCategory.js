import { Card, CardActionArea, CardMedia, Typography } from '@mui/material'
import React from 'react'

const SingleCategory = ({ category }) => {
    return (
        <>
            <Card variant='elevation' elevation={10} sx={{
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out',

                }
            }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="300"
                        image={category.image.path}
                        sx={{ filter: 'brightness(50%)' }}
                    />
                </CardActionArea>
                <Typography variant="h5" sx={{ textTransform: 'uppercase', textAlign: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'common.white', fontWeight: 1000, cursor: 'pointer' }} > {category.name}</Typography>
            </Card>
        </>
    )
}

export default SingleCategory
