import { Container } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import SingleProduct from '../components/SingleProduct'


const SingleProductPage = () => {

    const { productId } = useParams()
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
