import { Box, Button, Card, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const SingleCartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);
    }

    return (
        <>
            <Box sx={{
                borderBottom: '1px solid #ebebeb', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <Box sx={{ display: 'flex', flexDirection: ['column', 'row'], alignItems: ['start', 'center'] }}>
                    <Card variant='' sx={{
                        px: [1, 3], py: [3], display: 'flex'
                    }}>
                        <Link to='/products/1' >
                            <CardMedia
                                sx={{ borderRadius: 1, width: 100 }}
                                component="img"
                                image="https://source.unsplash.com/random"
                                alt="Live from space album cover"
                            >
                            </CardMedia>
                        </Link>
                        <Box sx={{ p: 2, display: 'flex', alignItems: 'start', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Link to='/products/1'>
                                <Typography gutterBottom variant="h6" fontWeight='normal' sx={{ my: 0, textTransform: 'capitalize' }} >
                                    {item.name}
                                </Typography>
                            </Link>

                            <Typography variant="body1" color='text.primary' fontWeight='bold'>₹{item.price} </Typography>
                            <Button variant="outlined" color="error" sx={{ mt: 1 }}>
                                Remove
                            </Button>
                        </Box>
                    </Card>
                    <Box sx={{ display: ['flex'], mr: 1 }}>
                        <IconButton size='small' aria-label="remove" onClick={() => quantity > 0 ? setQuantity(Number(quantity) - 1) : ""}>
                            <RemoveCircleIcon color='primary' />
                        </IconButton>
                        <TextField id='quantity' label="quantity" type="number" value={quantity} sx={{
                            width: '100px'
                        }}
                            onChange={(e) => handleChange(e)} size='small' InputProps={{ inputProps: { max: max } }} />
                        <IconButton size='small' aria-label="add" onClick={() => quantity < max ? setQuantity(Number(quantity) + 1) : ""}>
                            <AddCircleIcon color='primary' />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" color="initial">₹4000</Typography>
                </Box>
            </Box >
        </>
    )
}

export default SingleCartItem
