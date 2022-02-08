import { Box, Card, CardActionArea, CardContent, Chip, Skeleton, Typography } from '@mui/material'
import React from 'react'

const CardSkeleton = () => {
    return (
        <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
            <CardActionArea>
                <Skeleton height={180} />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                    <Skeleton variant="text" />
                </Typography>
                <Typography variant="body2" component='div'>
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


                <Typography variant="price" component='div' color='text.primary'>
                    <Skeleton variant="text" />
                </Typography>
            </CardContent>
            <Skeleton sx={{ borderRadius: 1 }} height={150} />
        </Card>
    )
}

export default CardSkeleton
