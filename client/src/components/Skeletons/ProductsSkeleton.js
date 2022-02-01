import { Box, Container, Grid, Pagination } from '@mui/material'
import React from 'react'
import ProductCard from '../ProductCard'
import ProductsGrid from '../ProductsGrid'

const ProductsSkeleton = ({ products }) => {
    return (
        <Container disableGutters={true} fixed >
            <Box sx={{ padding: 4 }}>
                <Grid padding={2} container spacing={3}>
                    {
                        Array(products).fill().map((_, i) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                                    <ProductCard />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </Container>

    )
}

export default ProductsSkeleton
