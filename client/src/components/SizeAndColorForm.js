import React from 'react'
import { Box, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';

const SizeAndColorForm = ({ product, form, setForm }) => {

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
                <FormControl variant="standard" sx={{ minWidth: '25%' }}>
                    <InputLabel id="color-label">
                        <Typography variant="caption" component='div' sx={{ textTransform: 'capitalize' }}>
                            Color
                        </Typography>
                    </InputLabel>
                    <Select
                        labelId="color-label"
                        id="color"
                        value={form.color}
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
                        value={form.size}
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


            </Box>
        </>
    )
}

export default SizeAndColorForm
