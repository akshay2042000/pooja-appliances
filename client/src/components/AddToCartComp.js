import { Box, Button, CardActions, Container, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addToCart } from '../utils/addToCart'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const AddToCartComp = ({ product, form, setForm }) => {
    const max = 100;
    const handleChange = (e, changeQuantity) => {
        if (changeQuantity) {
            var quantity = parseInt(form.quantity) + changeQuantity;
            if (quantity < 1) {
                quantity = 1;
            }
            if (quantity > max) {
                quantity = max;
            }
            setForm({ ...form, quantity })
            return;
        }

        if (e.target.name === 'quantity') {
            var quantity;
            if (e.target.value < 1) {
                quantity = 1;
            } else if (e.target.value > max) {
                quantity = max;
            } else {
                quantity = e.target.value;
            }
            setForm({ ...form, quantity: quantity })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }

    }

    return (
        <div>
            <CardActions sx={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <FormControl variant="standard" sx={{ minWidth: '30%' }}>
                        <InputLabel id="unit-label">
                            <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                                unit
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="unit-label"
                            id="unit"
                            value={form.unit}
                            name="unit"
                            onChange={(e) => handleChange(e)}
                            label="unit"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {
                                product.units.map((units, i) => (
                                    <MenuItem key={i} value={units}>{units}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                        <IconButton name="test" size='small' sx={{ mx: 0, padding: 0 }} aria-label="remove" onClick={(e) => handleChange(e, -1)}>
                            <RemoveCircleIcon color='primary' />
                        </IconButton>

                        <FormControl variant="standard" >
                            <TextField type='number' name='quantity' id='quantity' variant="outlined" autoComplete='off' value={form.quantity}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) => handleChange(e)} size='small' />
                        </FormControl>


                        <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="add" onClick={(e) => handleChange(e, +1)}>
                            <AddCircleIcon color='primary' />
                        </IconButton>
                    </Box>
                </Box>

                <Button size="large" sx={{ width: '100%' }} variant='contained' color="secondary" onClick={addToCart}>
                    Add To Cart
                </Button>
            </CardActions>
        </div>
    )
}

export default AddToCartComp
