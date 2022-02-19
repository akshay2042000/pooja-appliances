import React from 'react'
import { Outlet } from 'react-router-dom'

const OrderParent = () => {

    const INITIAL_FORM_STATE = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        arrivealDate: '',
        departureDate: '',
        message: '',
        termsOfService: false
    };


    return (
        <>
            {/* make the form states, and redux and api calls here */}

            {/* pass the coutlet context in here */}

            <Outlet />
        </>
    )
}

export default OrderParent
