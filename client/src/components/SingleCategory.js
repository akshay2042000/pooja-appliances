import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const SingleCategory = ({ category }) => {
    return (
        <>
            <Card raised sx={{
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
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        sx={{filter: 'brightness(50%)'}}
                    />
                </CardActionArea>
                <Typography variant="h5" sx={{  textTransform:'uppercase', textAlign:'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'common.white', fontWeight: 1000, cursor:'pointer'}} > {category}</Typography>
            </Card>
        </>
    )
}

export default SingleCategory
