import React from 'react'
import { Box, CardActions, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct } from '../redux/productSlice';


const SizeAndColorForm = ({ product, form, setForm }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: JSON.parse(e.target.value) })
    }

    return (
        <>
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
                        value={JSON.stringify(form.color)}
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
                        value={JSON.stringify(form.size)}
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


            </CardActions>
        </>
    )
}

export default SizeAndColorForm
