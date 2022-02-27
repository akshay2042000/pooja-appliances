import React from 'react'
import OrderList from '../../components/Admin/orderList/OrderList'
import ListForm from '../../components/Admin/ListForm'
import { Typography } from '@mui/material'

const OrdersPage = () => {
    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: 'center', p:3 }} >
                Orders
            </Typography>
            <ListForm page='orders' />
            <OrderList />
        </div>
    )
}

export default OrdersPage
