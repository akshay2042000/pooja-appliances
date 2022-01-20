import { Container } from '@mui/material'
import React from 'react'
import RelatedProducts from '../components/RelatedProducts'
import SingleProduct from '../components/SingleProduct'


const SingleProductPage = () => {
    return (
        <div>
            <Container disableGutters={true} fixed sx={{ p: 6 }}>
                <SingleProduct />
                <RelatedProducts />
            </Container>
        </div>
    )
}

export default SingleProductPage
