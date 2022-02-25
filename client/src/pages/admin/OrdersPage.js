import React from 'react'
import OrderList from '../../components/Admin/orderList/OrderList'
import ListForm from '../../components/Admin/ListForm'

const OrdersPage = () => {
    return (
        <div>
            <ListForm page='orders'/>
            <OrderList />
        </div>
    )
}

export default OrdersPage
