import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import applianceReducer from './applianceSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = configureStore({

    reducer: combineReducers({
        companyState: companyReducer,
        applianceState: applianceReducer,
    }),
    middleware: [thunk, logger],
})