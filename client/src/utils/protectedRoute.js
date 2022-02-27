import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import NotFoundPage from '../pages/NotFoundPage';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useSelector(state => state.userState);



    return (currentUser && currentUser.isAdmin) ? children : <NotFoundPage />;
}

export default PrivateRoute

