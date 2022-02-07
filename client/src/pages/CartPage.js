import React from 'react'
import { useSelector } from 'react-redux';
import CartComponent from '../components/CartComponent';

import EmptyCart from '../components/EmptyCart';

const CartPage = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const cartState = useSelector(state => state.cartState);
    const count = cartState[appliances].count;

    return (
        <>
            {!count ? (
                <EmptyCart />
            ) :
                (
                    <CartComponent />
                )}
        </>
    )
}

export default CartPage
