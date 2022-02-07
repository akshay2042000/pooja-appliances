import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import categoryReducer from './categorySlice';
import applianceReducer from './applianceSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    companyState: companyReducer,
    categoryState: categoryReducer,
    applianceState: applianceReducer,
    productState: productReducer,
    cartState: cartReducer
})

const persistConfig = {
    key: 'root',
    storage,
}


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({

    reducer: persistedReducer,
    middleware: [thunk, logger],
})


export let persistor = persistStore(store);
