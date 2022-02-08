import Typography from '@mui/material/Typography'
import { Box, Button, Card, CardActionArea, Paper, CardActions, Chip, CardContent, CardMedia, IconButton, Rating, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AddToCartComp from './AddToCartComp';
import { useTheme } from '@mui/material/styles';
import SizeAndColorForm from './SizeAndColorForm';
import { Link } from 'react-router-dom';
import CarouselComp from './CarouselComp';
import Api from '../api/index';
import CardSkeleton from './Skeletons/CardSkeleton';
import SingleProductSkeleton from './Skeletons/SingleProductSkeleton';



const SingleProduct = () => {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { app } = useParams()


    const [form, setForm] = useState({
        size: product?.variants?.sizes[0],
        color: product?.variants?.colors[0],
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

    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);
    }
    console.log(product)

    return (
        <>
            {
                !product ?
                    <SingleProductSkeleton />

                    :
                    (
                        <>
                            <Card variant='elevation' elevation={10} sx={{
                                padding: 2, display: 'flex',
                                flexDirection: ['column', 'column', 'row'],
                                mb: 3,

                            }}>
                                <CardMedia
                                    sx={{ borderRadius: 1, mb: 1, width: ['100%', '100%', '576px'] }}
                                >
                                    <CarouselComp h={['300px', '370px', '430px']} items={product.images} isHome={false} />
                                </CardMedia>

                                <Box sx={{ height: 'fit-content', px: 2 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" sx={{ textTransform: 'capitalize' }} >
                                            {`${product.name} - ${form.color.name} (${form.size.val})`}
                                        </Typography>
                                        <Typography variant="body1" component='div' sx={{ textTransform: 'capitalize' }}>
                                            {product.company.name}
                                        </Typography>
                                        <Box sx={{
                                            overflowX: 'auto', whiteSpace: 'nowrap', pb: '5px', '&::-webkit-scrollbar': {
                                                height: '6px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                borderRadius: '10px',
                                                backgroundColor: '#f1f1f1',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                backgroundColor: 'secondary.main',
                                                borderRadius: '10px',
                                            },
                                            mt: 1
                                        }}>
                                            {
                                                product.categories.map((category, i) => (
                                                    <Typography key={i} variant="caption" sx={{ textTransform: 'capitalize', pr: 0.5 }}>
                                                        <Link to={`/${app}/products?cat=${category._id}`}>
                                                            <Chip label={category.name} color="secondary" variant="outlined" clickable />
                                                        </Link>
                                                    </Typography>
                                                ))
                                            }
                                        </Box>
                                        <Typography mt={1} variant="price" component='div' color='text.primary'>₹{form.size.price} </Typography>
                                    </CardContent>
                                    <Box sx={{ px: 2 }}>
                                        <SizeAndColorForm product={product} form={form} setForm={setForm} />
                                        <AddToCartComp product={product} form={form} setForm={setForm} />
                                    </Box>

                                </Box>
                            </Card>
                        </>
                    )
            }



            {/* TODO: height of card media single product height: 400, width 100%, 576  */}
        </>
    )
}

export default SingleProduct



