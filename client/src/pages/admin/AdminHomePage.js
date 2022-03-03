import { Grid } from '@mui/material';
import React from 'react'
import LatestBills from '../../components/Admin/LatestBills';
import LatestOrders from '../../components/Admin/LatestOrders';

const AdminHomePage = () => {

    return (
        <>
            <Grid spacing={2} container sx={{ padding: { md: 5, xs: 2 } }}>
                <Grid item xs={12} lg={6}>
                    <LatestOrders />
                </Grid>
                <Grid item xs={12} lg={6} >
                    <LatestBills />
                </Grid>
            </Grid>
        </>
    )
}

export default AdminHomePage
