import React from 'react'
import CartComponent from '../components/CartComponent';

import EmptyCart from '../components/EmptyCart';

const CartPage = () => {
    const isEmpty = false

    return (
        <>
            {isEmpty ? (
                <EmptyCart />
            ) :
                (
                    <CartComponent />
                )}
        </>
    )
}

export default CartPage
