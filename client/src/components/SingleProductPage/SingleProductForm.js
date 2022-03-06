import { Alert, Box, Button, CardActions, FormControl, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { addItem } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateSelectedProduct } from '../../redux/productSlice';

const SingleProductForm = () => {
    const max = 100;
    const applianceState = useSelector(state => state.applianceState)
    const app = applianceState.appliances
    const productState = useSelector(state => state.productState)
    const product = productState.selectedProduct

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    const dispatch = useDispatch()

    const handleChange = (e, changeQuantity) => {
        if (changeQuantity) {
            var quantity = parseInt(product.quantity) + changeQuantity;
            if (quantity < 1) {
                quantity = 1;
            }
            if (quantity > max) {
                quantity = max;
            }
            dispatch(updateSelectedProduct({ ...product, quantity }))
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
            dispatch(updateSelectedProduct({ ...product, quantity }))
        } else {
            dispatch(updateSelectedProduct({ ...product, [e.target.name]: e.target.value }))
        }

    }

    const addToCart = () => {
        dispatch(addItem({ ...product, app: app }))
        setOpen(true);
    }

    return (
        <div>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <FormControl variant="standard" sx={{ minWidth: '25%' }}>
                    <InputLabel id="color-label">
                        <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                            Color
                        </Typography>
                    </InputLabel>

                    <Select
                        labelId="color-label"
                        id="color"
                        value={product.color}
                        name="color"
                        onChange={(e) => handleChange(e)}
                        label="color"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {
                            product.variants.colors.map((color, i) => (
                                <MenuItem key={i} value={color}>
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
                        value={product.size}
                        onChange={(e) => handleChange(e)}
                        label="size"
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {
                            product.variants.sizes.map((size, i) => (
                                <MenuItem key={i} value={size}>{size.val}</MenuItem>
                            ))
                        }

                    </Select>
                </FormControl>


            </CardActions>




            <CardActions sx={{ flexDirection: 'column', justifyContent: 'space-between' }}>
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
                                product.units.map((unit, i) => (
                                    <MenuItem key={i} value={unit}>{unit.name}</MenuItem>
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



                <Button size="large" sx={{ width: '100%' }} variant='contained' color="secondary" onClick={addToCart}>
                    Add To Cart
                </Button>

            </CardActions>

            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
            >
                <Alert variant='filled' severity="success" sx={{ width: '100%' }}>
                    Added To Cart!!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SingleProductForm
