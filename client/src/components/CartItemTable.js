import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import SingleCartItem from './SingleCartItem';

function createRow(name, price, quantity,) {
    var total = price * quantity
    return { name, price, quantity, total };
}

const rows = [
    createRow('Paperclips (Box)', 1000, 10),
    createRow('Paper (Case)', 2000, 10),
    createRow('Waste Basket', 3000, 2),
];

const CartItemTable = () => {
    return (
        <>
            <Paper variant='outlined' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                {
                    rows.map((item, i) => (
                        <SingleCartItem key={i} item={{ ...item, id: i+1 }} />
                    ))
                }
            </Paper>
        </>
    )
}

export default CartItemTable
