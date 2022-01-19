import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, IconButton, Rating, Slider, TextField } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);

    }
    const addToCart = () => {
        console.log('add to cart');
    }

    return (
        <>
            <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
                <Link to={`/products/${product.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="180"
                            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                            sx={{ borderRadius: 1 }}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                                {product.name}
                            </Typography>
                            <Typography variant="caption">
                                {product.desc}
                            </Typography>
                            <Rating sx={{ my: 2 }} name="read-only" value={4} readOnly />
                            <Typography variant="price" component='div' color='text.primary'>₹{product.price} </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', mr: 1 }}>
                        <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="remove" onClick={() => quantity > 0 ? setQuantity(quantity - 1) : ""}>
                            <RemoveCircleIcon color='primary' />
                        </IconButton>
                        <TextField id='quantity' label="quantity" type="number" value={quantity} sx={{
                            maxWidth: 150
                        }}
                            onChange={(e) => handleChange(e)} size='small' InputProps={{ inputProps: { max: max } }} />
                        <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="add" onClick={() => quantity < max ? setQuantity(quantity + 1) : ""}>
                            <AddCircleIcon color='primary' />
                        </IconButton>
                    </Box>

                    <Button size="large" variant='contained' color="secondary" onClick={addToCart} >
                        Buy
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ProductCard
