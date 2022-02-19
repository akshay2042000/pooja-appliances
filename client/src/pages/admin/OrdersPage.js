import React from 'react'
import OrderList from '../../components/Admin/orderList/OrderList'
import OrderListForm from '../../components/Admin/orderList/OrderListForm'

const OrdersPage = () => {
    return (
        <div>
            <OrderListForm />
            <OrderList />
        </div>
    )
}

export default OrdersPage
