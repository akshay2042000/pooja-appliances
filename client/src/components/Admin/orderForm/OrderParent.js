import React from 'react'
import { Outlet } from 'react-router-dom'

const OrderParent = () => {
    return (
        <>
            {/* make the form states, and redux and api calls here */}

            {/* pass the coutlet context in here */}

            <Outlet />
        </>
    )
}

export default OrderParent
