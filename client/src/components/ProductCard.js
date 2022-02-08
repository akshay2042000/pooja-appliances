import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Container, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import AddToCartComp from './AddToCartComp';
import { useLocation, useParams } from 'react-router-dom';
import SizeAndColorForm from './SizeAndColorForm';
import Chip from '@mui/material/Chip';
import CardSkeleton from './Skeletons/CardSkeleton';

const ProductCard = ({ product }) => {
    const { app } = useParams()

    const [form, setForm] = useState({
        size: product?.variants?.sizes[0],
        color: product?.variants?.colors[0],
        quantity: 1,
        unit: product?.units[0],
    })

    return (
        <>
            {
                !product ?
                    (
                        <CardSkeleton/>
                    )
                    :
                    (
                        <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
                            <Link to={`/${app}/products/${product._id}`}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={product.images[0].path}
                                        sx={{ borderRadius: 1 }}
                                    />

                                </CardActionArea>
                            </Link>
                            <CardContent>
                                <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                                    {`${product.name} - ${form.color.name} (${form.size.val})`}
                                </Typography>
                                <Typography variant="body2" component='div' sx={{ textTransform: 'capitalize' }}>
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

                            <SizeAndColorForm product={product} form={form} setForm={setForm} />
                            <AddToCartComp product={product} form={form} setForm={setForm} />

                        </Card>
                    )

            }


        </>
    )
}

export default ProductCard
