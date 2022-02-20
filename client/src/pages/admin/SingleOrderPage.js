import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import OrderForm from '../../components/Admin/orderForm/OrderForm'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleOrderThunk } from '../../redux/orderSlice';
import LoadingComponent from '../../components/Skeletons/LoadingComponent';
import NoComponentFound from '../../components/NoComponentFound';

const SingleOrderPage = () => {

    const { orderId } = useParams();
    const { singleOrder, singleOrderLoading, singleOrderError } = useSelector(state => state.orderState);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getSingleOrderThunk(orderId));
    }, [orderId])
    // const productState = useSelector(state => state.productState)
    // const product = productState.selectedProduct;

    return (
        <>
            {
                singleOrderLoading ?
                    (
                        <LoadingComponent />
                    ) :
                    singleOrderError ?
                        <NoComponentFound error={singleOrderError} />
                        :
                        (
                            <OrderForm />
                        )
            }
        </>

    )
}

export default SingleOrderPage
