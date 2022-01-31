import { createSlice } from '@reduxjs/toolkit';

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
        },
        getProductsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        getProductsError: (state, action) => {
            state.error = action.payload;
        },
        getSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        getSelectedProductLoading: (state, action) => {
            state.selectedProductLoading = action.payload;
        },
        getSelectedProductError: (state, action) => {
            state.selectedProductError = action.payload;
        }

    }
})

export const { getProducts, getProductsLoading, getProductsError, getSelectedProduct, getSelectedProductLoading, getSelectedProductError } = productSlice.actions;

export default productSlice.reducer;


export const fetchProductsThunk = (appliance,cat,comp ) => async (dispatch) => {
    console.log(appliance);
    console.log(cat);
    console.log(comp);

}

export const fetchSelectedProductThunk = () => async (dispatch) => {

}
