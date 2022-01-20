import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton, Rating, TextField } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { addToCart } from '../utils/addToCart';
import AddToCartComp from './AddToCartComp';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);

    }


    return (
        <>
            <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
                <Link to={`/products/${product.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image={product.image}
                            sx={{ borderRadius: 1 }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                                {product.name}
                            </Typography>
                            <Typography variant="caption" component='div'>
                                {product.desc}
                            </Typography>
                            <Rating sx={{ my: 2 }} name="read-only" value={4} readOnly />
                            <Typography variant="price" component='div' color='text.primary'>₹{product.price} </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <AddToCartComp />
            </Card>
        </>
    )
}

export default ProductCard
