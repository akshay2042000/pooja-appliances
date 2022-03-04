import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, CardActionArea, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import {  useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import CardSkeleton from '../Skeletons/CardSkeleton';
import { addItem } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux'



const ProductCard = ({ product }) => {
    const { app } = useParams()
    const dispatch = useDispatch()
    const categoryState = useSelector(state => state.categoryState);
    const categories = categoryState.categories;


    const [form, setForm] = useState({
        size: product?.variants?.sizes[0],
        color: product?.variants?.colors[0],
        quantity: 1,
        unit: product?.units[0],
    })
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const addToCart = () => {
        dispatch(addItem({ ...product, ...form, app: app }))
        setOpen(true);
    }

    return (
        <>
            {
                !product ?
                    (
                        <CardSkeleton />
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
                                        product.categories.map((category, i) => {
                                            if (categories.find(cat => cat._id === category._id)) {
                                                return (
                                                    <Typography key={i} variant="caption" sx={{ textTransform: 'capitalize', pr: 0.5 }}>
                                                        <Link to={`/${app}/products?cat=${category._id}`}>
                                                            <Chip label={category.name} color="secondary" variant="outlined" clickable />
                                                        </Link>
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                                <Typography mt={1} variant="price" component='div' color='text.primary'>₹{form.size.price} </Typography>
                            </CardContent>

                            <Button size="large" sx={{ width: '100%' }} variant='contained' color="secondary" onClick={addToCart}>
                                Add To Cart
                            </Button>

                            <Snackbar
                                open={open}
                                autoHideDuration={2000}
                                onClose={handleClose}
                            >
                                <Alert variant='filled' severity="success" sx={{ width: '100%' }}>
                                    Added To Cart!!
                                </Alert>
                            </Snackbar>
                        </Card>
                    )

            }


        </>
    )
}

export default ProductCard
