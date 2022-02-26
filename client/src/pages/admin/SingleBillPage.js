import React, { useEffect } from 'react'
import BillPdfViewer from '../../components/Admin/BillPdfViewer'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBillThunk } from '../../redux/billSlice';
import LoadingComponent from '../../components/Skeletons/LoadingComponent';
import NoComponentFound from '../../components/NoComponentFound';



const SingleBillPage = () => {

    const { billId } = useParams();
    const { singleBill, singleBillLoading, singleBillError } = useSelector(state => state.billState);
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getSingleBillThunk(billId));
    }, [billId]);

    return (

        <>
            {
                singleBillLoading ?
                    (
                        <LoadingComponent />
                    ) :
                    singleBillError ?
                        (
                            <NoComponentFound error={singleBillError} />
                        ) :
                        (
                            <BillPdfViewer />
                        )
            }

        </>
    )
}

export default SingleBillPage
