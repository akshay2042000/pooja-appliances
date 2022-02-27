import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setAppliances } from '../redux/applianceSlice';

const Appliances = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;

    const dispatch = useDispatch();
    let { pathname } = useLocation();
    pathname = pathname.split('/')[1];


    useEffect(() => {
        if (pathname && (pathname === 'pooja' || pathname === 'creative')) {
            dispatch(setAppliances(pathname));
        }
    }, [])


    return (
        <div>
            {
                (pathname && (pathname === 'pooja' || pathname === 'creative')) ?
                    (
                        <Outlet />
                    )
                    :
                    (
                        <NotFoundPage />
                    )
            }
        </div>
    )
}

export default Appliances
