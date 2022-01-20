import { Box, Button, CardActions, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addToCart } from '../utils/addToCart'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const AddToCartComp = ({ button }) => {
    const [quantity, setQuantity] = useState(0);
    const max = 100;
    const handleChange = (e) => {
        e.target.value < 0 ? setQuantity(0) : e.target.value > max ? setQuantity(max) : setQuantity(e.target.value);
    }
    return (
        <div>
            <CardActions sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', mr: 1 }}>
                    <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="remove" onClick={() => quantity > 0 ? setQuantity(Number(quantity) - 1) : ""}>
                        <RemoveCircleIcon color='primary' />
                    </IconButton>
                    <TextField id='quantity' label="quantity" type="number" value={quantity} sx={{
                        maxWidth: 150
                    }}
                        onChange={(e) => handleChange(e)} size='small' InputProps={{ inputProps: { max: max } }} />
                    <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="add" onClick={() => quantity < max ? setQuantity(Number(quantity) + 1) : ""}>
                        <AddCircleIcon color='primary' />
                    </IconButton>
                </Box>
                <Button size="large" variant='contained' color="secondary" onClick={addToCart}>
                    {button ? button : 'Buy'}
                </Button>
            </CardActions>
        </div>
    )
}

export default AddToCartComp
