import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';


const initialState = {
    companies: [],
    loading: true,
    error: null,

};


const companySlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        getCompanies: (state, action) => {
            state.companies = action.payload;
            state.error = null;
        },
        getCompaniesLoading: (state, action) => {
            state.loading = action.payload;
        },
        getCompaniesError: (state, action) => {
            state.error = action.payload;
            state.companies=[];
        }
    }
})

export const { getCompanies, getCompaniesLoading, getCompaniesError } = companySlice.actions;
export default companySlice.reducer;

//  thunks

export const fetchCompaniesThunk = (appliances) => async (dispatch) => {
    try {
        const { data } = await Api.getCompanies(appliances);
        dispatch(getCompanies(data.data));
        dispatch(getCompaniesLoading(false));
    } catch (err) {
        dispatch(getCompaniesError(err));
        dispatch(getCompaniesLoading(false));
    }
} 