import Typography from '@mui/material/Typography'
import { Box, Card, Chip, CardContent, CardMedia } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AddToCartComp from './AddToCartComp';
import { useTheme } from '@mui/material/styles';
import SizeAndColorForm from './SizeAndColorForm';
import { Link } from 'react-router-dom';
import CarouselComp from './CarouselComp';
import SingleProductSkeleton from './Skeletons/SingleProductSkeleton';



const SingleProduct = ({ product, form, setForm }) => {
    const { app } = useParams()

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

                                <Box sx={{ height: 'fit-content', px: 2, py: [2, 2, 0] }}>
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



