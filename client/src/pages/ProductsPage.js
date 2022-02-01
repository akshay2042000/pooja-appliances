import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Box, Grid, Pagination, Skeleton } from '@mui/material'
import ProductsGrid from '../components/ProductsGrid'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsThunk } from '../redux/productSlice'
import NoComponentFound from '../components/NoComponentFound'
import ProductsSkeleton from '../components/Skeletons/ProductsSkeleton'


const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const cat = searchParams.get("cat");
    const comp = searchParams.get("comp");
    const [currentPage, setCurrentPage] = useState(1);
    const productState = useSelector(state => state.productState)
    const products = productState.products;
    const productsPerPage = 4
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const dispatch = useDispatch()
    const applianceState = useSelector(state => state.applianceState)
    const app = applianceState.appliances;

    const handleChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        dispatch(fetchProductsThunk(app, cat, comp));
    }, [app, cat, comp]);

    return (
        <div>
            {
                !productState.error && (
                    <Box sx={{ color: 'common.white', bgcolor: 'primary.main', padding: 2 }}>
                        <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bolder' }} variant="h1" >{
                            productState.isLoading ? (
                                <Skeleton variant="text" width='60%' sx={{mx:'auto'}} />
                            ) :
                                cat ? cat : comp ? comp : 'All Products'
                        }</Typography>
                    </Box>
                )
            }
            {
                productState.isLoading ?
                    <ProductsSkeleton products={productsPerPage} />
                    :
                    productState.error ?
                        <NoComponentFound error={productState.error} />
                        :
                        <Container disableGutters={true} fixed >
                            <Box sx={{ padding: 4 }}>
                                <ProductsGrid products={currentProducts} />
                                <Pagination sx={{ width: 'fit-content', mx: 'auto' }} count={Math.ceil(products.length / productsPerPage)} color="secondary" size="large" onChange={handleChange} />
                            </Box>
                        </Container>
            }
        </div>
    )
}

export default ProductsPage
