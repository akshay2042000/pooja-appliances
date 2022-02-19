import React from 'react'
import { useOutletContext } from 'react-router-dom';

const OrderForm = () => {
    const [count, setCount] = useOutletContext();
    const increment = () => setCount(c => c + 1);
    return (
        <div>
            {/* this gets the form outet context */}

            order form
            <button onClick={increment}>{count}</button>;
        </div>
    )
}   

export default OrderForm
