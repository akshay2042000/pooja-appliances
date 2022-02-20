import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';

const initialState = {
    products: [],
    isLoading: true,
    error: null,
    selectedProduct: null,
    selectedProductLoading: true,
    selectedProductError: null,
    searchedProducts: [],
    searchedProductsLoading: false,
    searchedProductsError: null,
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
            state.products = [];
        },
        getSingleProductStart: (state, action) => {
            state.selectedProductLoading = true;
        },
        getSingleProductSuccess: (state, action) => {
            state.selectedProductLoading = false;
            state.selectedProduct = action.payload;
            state.selectedProductError = null;
        },
        getSingleProductFailure: (state, action) => {
            state.selectedProductLoading = false;
            state.selectedProductError = action.payload;
        },
        updateSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        getSearchedProducts: (state, action) => {
            state.searchedProducts = action.payload;
            state.error = null;
        },
        getSearchedProductsLoading: (state, action) => {
            state.searchedProductsLoading = action.payload;
        },
        getSearchedProductsError: (state, action) => {
            state.searchedProductsError = action.payload;
            state.searchedProducts = [];
        }
    }
})

export const { getProducts, getProductsLoading, getProductsError, getSearchedProducts, getSearchedProductsLoading, getSearchedProductsError, getSingleProductStart, updateSelectedProduct, getSingleProductFailure, getSingleProductSuccess } = productSlice.actions;

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

export const fetchSelectedProductThunk = (id) => async (dispatch) => {
    dispatch(getSingleProductStart());
    try {
        const { data } = await Api.getSingleProduct(id);
        dispatch(getSingleProductSuccess({ ...data.data, quantity: 1, unit: data.data.units[0], size: data.data.variants.sizes[0], color: data.data.variants.colors[0] }));
    } catch (err) {
        dispatch(getSingleProductFailure(err));
    }
}


export const fetchSearchedProducts = (appliances, key) => async (dispatch) => {
    dispatch(getSearchedProductsLoading(true));
    try {
        const { data } = await Api.getSearchedItem(appliances, key);
        dispatch(getSearchedProducts(data.data));
        dispatch(getSearchedProductsLoading(false));
    } catch (err) {
        dispatch(getSearchedProductsError(err));
        dispatch(getSearchedProductsLoading(false));
    }

}
