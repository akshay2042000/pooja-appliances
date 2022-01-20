import { Grid } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'

const ProductsGrid = ({ products }) => {
    return (
        <Grid padding={2} container spacing={3}>
            {
                products.map(product => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <ProductCard product={product} key={product.id} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default ProductsGrid
