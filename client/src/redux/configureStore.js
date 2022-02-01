import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import categoryReducer from './categorySlice';
import applianceReducer from './applianceSlice';
import productReducer from './productSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = configureStore({

    reducer: combineReducers({
        companyState: companyReducer,
        categoryState: categoryReducer,
        applianceState: applianceReducer,
        productState: productReducer
    }),
    middleware: [thunk, logger],
})