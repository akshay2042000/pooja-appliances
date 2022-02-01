import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Rating, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import AddToCartComp from './AddToCartComp';
import { useLocation, useParams } from 'react-router-dom';


const ProductCard = ({ product }) => {
    const { app } = useParams()
    const location = useLocation();
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);

    }
    return (
        <>
            {
                !product ?
                    (
                        <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
                            <CardActionArea>
                                <Skeleton height={180} />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                                        <Skeleton variant="text" />
                                    </Typography>
                                    <Typography variant="caption" component='div'>
                                        <Skeleton variant="text" />
                                    </Typography>
                                    <Skeleton sx={{ my: 2 }} height={30} variant='text' />
                                    <Typography variant="price" component='div' color='text.primary'> </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Skeleton sx={{borderRadius:2}}  height={40}  />
                        </Card>
                    )
                    :
                    (
                        <Card variant='elevation' elevation={10} sx={{ padding: 2 }}>
                            <Link to={`/${app}/products/${product._id}`}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={product.image.path}
                                        sx={{ borderRadius: 1 }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" sx={{ textTransform: 'capitalize' }} >
                                            {product.name}
                                        </Typography>
                                        <Typography variant="caption" component='div'>
                                            {product.company.name}
                                        </Typography>
                                        <Rating sx={{ my: 2 }} name="read-only" value={4} readOnly />
                                        <Typography variant="price" component='div' color='text.primary'>₹{product.price} </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <AddToCartComp />
                        </Card>
                    )
            }


        </>
    )
}

export default ProductCard
