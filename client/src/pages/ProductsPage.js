import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import { Box, Pagination, Skeleton } from '@mui/material'
import ProductsGrid from '../components/Products/ProductsGrid'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductsThunk } from '../redux/productSlice'
import NoComponentFound from '../components/NoComponentFound'
import ProductsSkeleton from '../components/Skeletons/ProductsSkeleton'

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const cat = searchParams.get("cat");
    const comp = searchParams.get("comp");

    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 20;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const applianceState = useSelector(state => state.applianceState)
    const productState = useSelector(state => state.productState)
    const products = productState.products;
    const app = applianceState.appliances;

    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const dispatch = useDispatch()

    const handleChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        if (app) {
            dispatch(fetchProductsThunk(app, cat, comp));
        }
        return () => {
            setCurrentPage(1);
        };
    }, [app, cat, comp]);


    return (
        <div>
            {
                !productState.error && (
                    <Box sx={{ flexGrow: 1, color: 'common.white', bgcolor: 'primary.main', padding: 1.5, }}>
                        <Typography sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bolder' }} variant="h4" >{
                            productState.isLoading ? (
                                <Skeleton variant="text" width='60%' sx={{ mx: 'auto' }} />
                            ) :
                                comp ? products[0]?.company?.name :
                                    cat ?
                                        products[0]?.categories?.filter(category => category._id === cat)[0]?.name
                                        : 'All Products'
                        }</Typography>
                    </Box>
                )
            }
            {
                productState.isLoading ?
                    <ProductsSkeleton products={8} />
                    :
                    productState.error ?
                        <NoComponentFound message={"No products found"} />
                        :

                        <Container disableGutters={true} fixed >
                            <Box sx={{ padding: 4 }}>
                                <Pagination sx={{ width: 'fit-content', mx: 'auto', marginBottom: 2, display: { xs: 'block', md: 'none' } }} count={Math.ceil(products.length / productsPerPage)} color="secondary" size="large" onChange={handleChange} />
                                <ProductsGrid products={currentProducts} />
                                <Pagination sx={{ width: 'fit-content', mx: 'auto', my: 4 }} count={Math.ceil(products.length / productsPerPage)} color="secondary" size="large" onChange={handleChange} />
                            </Box>
                        </Container>
            }
        </div>
    )
}

export default ProductsPage
