import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';


const initialState = {
    bills: [],
    loading: true,
    error: null,

};


const companySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload;
            state.error = null;
        },
        getCategoriesLoading: (state, action) => {
            state.loading = action.payload;
        },
        getCategoriesError: (state, action) => {
            state.error = action.payload;
            state.categories = [];
        }
    }
})

export const { getCategories, getCategoriesLoading, getCategoriesError } = companySlice.actions;
export default companySlice.reducer;

//  thunks

export const fetchCategoriesThunk = (appliances) => async (dispatch) => {
    if(appliances === 'pooja' || appliances === 'creative' || appliances === ''){
        dispatch(getCategoriesLoading(true));
        try {
            const { data } = await Api.getCategories(appliances);
            dispatch(getCategories(data.data));
            dispatch(getCategoriesLoading(false));
        } catch (err) {
            dispatch(getCategoriesError(err));
            dispatch(getCategoriesLoading(false));
        }
    }
   
} 