import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Box, Grid, Pagination } from '@mui/material'
import ProductCard from '../components/ProductCard'
import ProductsGrid from '../components/ProductsGrid'

const products = [{
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "1"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "2"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "3"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "4"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "5"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "6"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "7"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "8"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "9"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "10"
}, {
    name: "Product 1", price: "100", image: "https://source.unsplash.com/random/400x400", desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "11"
},
]

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const cat = searchParams.get("cat");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 4

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <Box sx={{ color: 'common.white', bgcolor: 'primary.main', padding: 2 }}>
                <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold' }} variant="h2" >{cat}</Typography>
            </Box>
            <Container disableGutters={true} fixed >

                <Box sx={{ padding: 4 }}>
                    <ProductsGrid products={currentProducts} />
                    <Pagination sx={{ width: 'fit-content', mx: 'auto' }} count={Math.ceil(products.length / productsPerPage)} color="secondary" size="large" onChange={handleChange} />
                </Box>
            </Container>

        </div>
    )
}

export default ProductsPage
