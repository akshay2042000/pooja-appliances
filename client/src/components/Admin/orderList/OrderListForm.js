import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getOrderListThunk } from '../../../redux/orderSlice';
import { useDispatch } from 'react-redux';

const OrderListForm = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        appliance: 'all',
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        dispatch(getOrderListThunk(form));
    }, [form]);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', paddingX: { md: 5, xs: 2 }, paddingTop: { md: 5, xs: 2 }, width: { xs: '100%', sm: '80%', lg: '60%', xl: '40%' } }} >
            <Box>
                <FormControl >
                    <InputLabel id="appliance-label">Appliance</InputLabel>
                    <Select
                        variant='outlined'
                        size='small'
                        labelId="appliance-label"
                        id="appliance"
                        value={form.appliance}
                        label="Appliance"
                        name='appliance'
                        onChange={(e) => handleChange(e)}
                    >
                        <MenuItem value={'pooja'}>Pooja</MenuItem>
                        <MenuItem value={'creative'}>Creative</MenuItem>
                        <MenuItem value={'all'}>All Appliances</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    )
}

export default OrderListForm
