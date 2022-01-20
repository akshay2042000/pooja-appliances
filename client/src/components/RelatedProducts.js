import { Box, Typography } from '@mui/material'
import React from 'react'
import ProductsGrid from './ProductsGrid'

const products = [{
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "1"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "2"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "3"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "4"
}
]

const RelatedProducts = () => {
    return (
        <div>
            <Box sx={{ py: 8, px: 5 }}>
                <Typography mb={2} textAlign='center' variant="h2" fontWeight='bold' color="initial">Related Products</Typography>
                <Box sx={{ py: 4 }}>
                    <ProductsGrid products={products} />
                </Box>


            </Box>
        </div >
    )
}

export default RelatedProducts
