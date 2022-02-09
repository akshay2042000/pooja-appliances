import { Container } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import SingleProduct from '../components/SingleProduct'
import Api from '../api/index';


const SingleProductPage = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const { app } = useParams()


    const [form, setForm] = useState({
        size: product?.variants.sizes[0],
        color: product?.variants.colors[0],
        quantity: 1,
        unit: product?.units[0],
    })

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await Api.getSingleProduct(productId);
            setForm({
                size: data.data.variants.sizes[0],
                color: data.data.variants.colors[0],
                quantity: 1,
                unit: data.data.units[0],
            })
            setProduct(data.data);

        }
        getProduct();
    }, [])


    useEffect(() => {
        if (product) {
            const getRelatedProducts = async () => {
                console.log("🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 🧑 ", product);
                const { data } =  await Api.getRelatedProducts(app, product.company._id, product.categories);
                setRelatedProducts(data.data);
            }
            getRelatedProducts();
        }

    }, [product])

    return (
        <div>

            <Container disableGutters={true} fixed sx={{ py: 6 }}>
                <SingleProduct product={product} form={form} setForm={setForm} />
                <RelatedProducts products={relatedProducts} />
            </Container>
        </div>
    )
}

export default SingleProductPage
