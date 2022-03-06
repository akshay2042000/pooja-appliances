import { configureStore, combineReducers } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import categoryReducer from './categorySlice';
import applianceReducer from './applianceSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice';
import billReducer from './billSlice';
import cartReducer from './cartSlice';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const combinedReducer = combineReducers({
    companyState: companyReducer,
    categoryState: categoryReducer,
    applianceState: applianceReducer,
    productState: productReducer,
    cartState: cartReducer,
    userState: userReducer,
    orderState: orderReducer,
    billState: billReducer,
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return combinedReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartState', 'userState']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: process.env.NODE_ENV === 'development' ? [thunk, logger] : [thunk],
})


export let persistor = persistStore(store);
