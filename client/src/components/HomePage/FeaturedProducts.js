import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductsGrid from '../Products/ProductsGrid'
import { Box, Container, Typography } from '@mui/material'
import ProductsSkeleton from '../Skeletons/ProductsSkeleton'
import { fetchFeaturedProducts } from '../../redux/productSlice'
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
            <Container fixed disableGutters={true} sx={{ paddingX: 4 }}>
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
                                <></>
                            ) :
                            (<Box sx={{ py: 4, px: 0, marginTop: 6 }}>
                                <Typography mb={2} textAlign='center' variant="h3" fontWeight='bold' color="initial">Featured Products</Typography>
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
