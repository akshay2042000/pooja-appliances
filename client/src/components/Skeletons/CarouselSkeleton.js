import { Skeleton } from '@mui/material'
import React from 'react'



const CarouselSkeleton = ({ h }) => {
    return (
        <div>
            <Skeleton variant="rectangular" sx={{ height: h  }} />
        </div>
    )
}

export default CarouselSkeleton
