import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import SingleProduct from '../components/SingleProduct'
import Api from '../api/index';
import { fetchSelectedProductThunk } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const SingleProductPage = () => {

    const { productId } = useParams();
    const [relatedProducts, setRelatedProducts] = useState(null);
    const { app } = useParams()
    const dispatch = useDispatch();
    const productState = useSelector(state => state.productState)
    const product = productState.selectedProduct;

    useEffect(() => {
        dispatch(fetchSelectedProductThunk(productId));
    }, [productId])


    useEffect(() => {
        if (product) {
            const getRelatedProducts = async () => {
                const { data } = await Api.getRelatedProducts(app, product.company._id, product.categories);
                data.data = data.data.filter(p => p._id !== productId)
                setRelatedProducts(data.data);
            }
            getRelatedProducts();
        }

    }, [productId])

    return (
        <div>
            <Container disableGutters={true} fixed sx={{ py: 6, px: 2 }}>
                <SingleProduct />
                <RelatedProducts products={relatedProducts} />
            </Container>
        </div>
    )
}

export default SingleProductPage
