import Typography from '@mui/material/Typography'
import { Box, Button, Card, CardActionArea, Paper, CardActions, CardContent, CardMedia, IconButton, Rating, TextField } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react'
import { addToCart } from '../utils/addToCart';
import { useParams } from 'react-router-dom';
import AddToCartComp from './AddToCartComp';

import { useTheme } from '@mui/material/styles';
import CarouselComp from './CarouselComp';


const product = {
    name: "Product 1", price: "400", images: ["https://source.unsplash.com/random/400x400", "https://source.unsplash.com/random/400x400"], desc: 'Space for a small product description', category: 'Cat 1', brand: 'Brand 1', id: "1"
}

const items = product.images.map(image => ({ image: image }))
console.log(items);

const SingleProduct = () => {

    const { productId } = useParams();
    const theme = useTheme();
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);

    }
    return (
        <div>

            <Card variant='elevation' elevation={10} sx={{
                padding: 2, display: 'flex',
                flexDirection: ['column', 'column', 'row'],
                mb: 3
            }}>
                <CardMedia
                    sx={{ borderRadius: 1, mb: 1, width: ['100%', '100%', '569px'] }}
                >
                    <CarouselComp items={items} />
                </CardMedia>

                <Box sx={{ height: 'fit-content', my: 'auto', p: 2 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" fontWeight='bold' sx={{ my: 0, textTransform: 'capitalize' }} >
                            {product.name}
                        </Typography>
                        <Typography variant="price" component='div' color='text.primary'>₹{product.price} </Typography>
                        <Typography variant="body1" component='div'>
                            {product.desc}
                        </Typography>
                        <Rating sx={{ my: 2 }} name="read-only" value={4} readOnly />

                    </CardContent>
                    <AddToCartComp button={'Add To Cart'} />
                </Box>

            </Card>

        </div>
    )
}

export default SingleProduct
