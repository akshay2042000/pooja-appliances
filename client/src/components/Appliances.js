import React from 'react'
import { Outlet, useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';

const Appliances = () => {
    const { app } = useParams();
    return (
        <div>
            {
                (app === 'pooja' || app === 'creative') ?
                    (
                        <Outlet />
                    )
                    :
                    (
                        <NotFoundPage  />
                    )
            }
        </div>
    )
}

export default Appliances
