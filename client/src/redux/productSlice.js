import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';

const initialState = {
    products: [],
    isLoading: true,
    error: null,
    selectedProduct: null,
    selectedProductLoading: false,
    selectedProductError: null,
}


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload;
            state.error = null;
        },
        getProductsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        getProductsError: (state, action) => {
            state.error = action.payload;
            state.products=[];
        },
        getSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
            state.error = null;
        },
        getSelectedProductLoading: (state, action) => {
            state.selectedProductLoading = action.payload;
        },
        getSelectedProductError: (state, action) => {
            state.selectedProductError = action.payload;
            state.products=[];
        }

    }
})

export const { getProducts, getProductsLoading, getProductsError, getSelectedProduct, getSelectedProductLoading, getSelectedProductError } = productSlice.actions;

export default productSlice.reducer;


export const fetchProductsThunk = (appliance, cat, comp) => async (dispatch) => {
    dispatch(getProductsLoading(true));
    try {
        const { data } = await Api.getProducts(appliance, cat, comp);
        dispatch(getProducts(data.data));
        dispatch(getProductsLoading(false));
    } catch (err) {
        dispatch(getProductsError(err));
        dispatch(getProductsLoading(false));
    }

}

export const fetchSelectedProductThunk = () => async (dispatch) => {
    dispatch(getSelectedProductLoading(true));
    try {
        const { data } = await Api.getSelectedProduct();
        dispatch(getSelectedProduct(data.data));
        dispatch(getSelectedProductLoading(false));
    } catch (err) {
        dispatch(getSelectedProductError(err));
        dispatch(getSelectedProductLoading(false));
    }

}
