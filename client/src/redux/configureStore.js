import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = configureStore({

    reducer: combineReducers({
        companyState: companyReducer,
    }),
    middleware: [thunk, logger],
})