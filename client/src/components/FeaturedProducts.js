import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductsGrid from './ProductsGrid'
import { Box, Container, Typography } from '@mui/material'
import NoComponentFound from './NoComponentFound'
import ProductsSkeleton from './Skeletons/ProductsSkeleton'
import { fetchFeaturedProducts } from '../redux/productSlice'
import { useParams } from 'react-router-dom'

const FeaturedProducts = () => {
    const { featuredProducts, featuredProductsLoading, featuredProductsError } = useSelector(state => state.productState)
    const { app } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchFeaturedProducts(app))
    }, [app]);

    return (
        <>
            <Container disableGutters={true}>
                {
                    featuredProductsLoading ?
                        (
                            <Box sx={{ py: 4, px: 0, marginTop: 6 }}>
                                <ProductsSkeleton products={4} />
                            </Box>
                        )
                        :
                        featuredProductsError ?
                            (
                                <NoComponentFound error={featuredProductsError} />
                            ) :
                            (<Box sx={{ py: 4, px: 0, marginTop: 6 }}>
                                <Typography mb={2} textAlign='center' variant="h2" fontWeight='bold' color="initial">Featured Products</Typography>
                                <Box sx={{ py: 4 }}>
                                    <ProductsGrid products={featuredProducts} />
                                </Box>
                            </Box>)
                }
            </Container >
        </>
    )
}

export default FeaturedProducts
