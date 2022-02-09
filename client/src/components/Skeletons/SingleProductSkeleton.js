import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Skeleton, Typography } from '@mui/material'
import CarouselSkeleton from './CarouselSkeleton'


const SingleProductSkeleton = () => {
    return (
        <Card variant='elevation' elevation={10} sx={{
            padding: 2, display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            mb: 3,

        }}>
            <CardMedia
                sx={{ borderRadius: 1, mb: 1, width: ['100%', '100%', '576px'] }}
            >
                <CarouselSkeleton h={['300px', '370px', '430px']} />
            </CardMedia>

            <Box sx={{ height: 'fit-content', px: 2 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize' }} >
                        <Skeleton variant="text" height={50} sx={{ width: ['100%', '100%', 400] }} />
                    </Typography>
                    <Typography variant="body1" component='div' sx={{ textTransform: 'capitalize' }}>
                        <Skeleton variant="text" />
                    </Typography>
                    <Box sx={{
                        overflowX: 'auto', whiteSpace: 'nowrap', pb: '5px',
                        mt: 1
                    }}>
                        {
                            Array(2).fill().map((_, i) => {
                                return (
                                    <Chip key={i} label={<Skeleton variant="text" width={'50px'} sx={{ height: '100%' }} />} />
                                )
                            })
                        }
                    </Box>
                    <Typography mt={1} variant="price" component='div' color='text.primary'>
                        <Skeleton variant="text" />
                    </Typography>
                </CardContent>
                <Box sx={{ px: 2 }}>
                    <Skeleton sx={{ borderRadius: 1, mb: 2 }} height={70} />
                    <Skeleton sx={{ borderRadius: 1 }} height={100} />
                </Box>
            </Box>
        </Card>
    )
}

export default SingleProductSkeleton
