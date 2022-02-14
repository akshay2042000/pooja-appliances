import React from 'react'
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateItem } from '../redux/cartSlice';
import { useParams } from 'react-router-dom';



const CartItemForm = ({ index }) => {
    const max = 100;
    const { app } = useParams()
    const cartState = useSelector(state => state.cartState);
    const cart = cartState[app];
    const product = cart.items[index];
    const dispatch = useDispatch();
    

    const handleChange = (e, changeQuantity) => {
        if (changeQuantity) {
            var quantity = parseInt(product.quantity) + changeQuantity;
            if (quantity === 0) {
                dispatch(removeItem({ ...product }))
                return;
            }
            if (quantity > max) {
                quantity = max;
            }
            dispatch(updateItem({ ...product, targetName: "quantity", targetValue: quantity }));
            return;
        }

        if (e.target.name === 'quantity') {
            var quantity;
            if (e.target.value === 0) {
                dispatch(removeItem({ ...product }))
                return;
            } else if (e.target.value > max) {
                quantity = max;
            } else {
                quantity = e.target.value;
            }
            dispatch(updateItem({ ...product, targetName: "quantity", targetValue: quantity }));
        } else if (e.target.name === 'size' || e.target.name === 'color') {
            dispatch(updateItem({ ...product, targetName: e.target.name, targetValue: JSON.parse(e.target.value) }));
        } else {
            dispatch(updateItem({ ...product, targetName: e.target.name, targetValue: e.target.value }));
        }

    }


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, width: '100%' }}>
                    <FormControl variant="standard" sx={{ minWidth: '30%' }}>
                        <InputLabel id="unit-label">
                            <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                                unit
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="unit-label"
                            id="unit"
                            value={product.unit}
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
                            <TextField type='number' name='quantity' id='quantity' variant="outlined" autoComplete='off' value={product.quantity}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e) => handleChange(e)} size='small' />
                        </FormControl>


                        <IconButton size='small' sx={{ mx: 0, padding: 0 }} aria-label="add" onClick={(e) => handleChange(e, +1)}>
                            <AddCircleIcon color='primary' />
                        </IconButton>
                    </Box>
                </Box>


                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                    <FormControl variant="standard" sx={{ minWidth: '25%' }}>
                        <InputLabel id="color-label">
                            <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                                Color
                            </Typography>
                        </InputLabel>

                        <Select
                            labelId="color-label"
                            id="color"
                            value={JSON.stringify(product.color)}
                            name="color"
                            onChange={(e) => handleChange(e)}
                            label="color"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {
                                product.variants.colors.map((color, i) => (
                                    <MenuItem key={i} value={JSON.stringify(color)}>
                                        <Box sx={{ width: '25px', height: '25px', backgroundColor: color.hex, borderRadius: '50%' }} />
                                    </MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>

                    <FormControl variant="standard" sx={{ minWidth: '55%' }}>
                        <InputLabel id="size-label">
                            <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                                Size
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="size-label"
                            id="size"
                            name="size"
                            value={JSON.stringify(product.size)}
                            onChange={(e) => handleChange(e)}
                            label="size"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            {
                                product.variants.sizes.map((size, i) => (
                                    <MenuItem key={i} value={JSON.stringify(size)}>{size.val}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>


                </Box>
            </Box>



        </>
    )
}

export default CartItemForm
