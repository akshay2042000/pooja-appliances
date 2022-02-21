import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';


const initialState = {
    bills: [],
    loading: true,
    error: null,
    isBillSubmitting: false,
    billSubmittingError: null,
    submittedBill: null,
};


const billSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        // getCategories: (state, action) => {
        //     state.categories = action.payload;
        //     state.error = null;
        // },
        // getCategoriesLoading: (state, action) => {
        //     state.loading = action.payload;
        // },
        // getCategoriesError: (state, action) => {
        //     state.error = action.payload;
        //     state.categories = [];
        // },
        submitBillLoading: (state, action) => {
            state.isBillSubmitting = action.payload;
        },
        submitBillError: (state, action) => {
            state.isBillSubmitting = false;
            state.billSubmittingError = action.payload;
        },
        submitBillSuccess: (state, action) => {
            state.isBillSubmitting = false;
            state.billSubmittingError = null;
            state.submittedBill = action.payload;
        },
    }
})

export const { submitBillLoading, submitBillError, submitBillSuccess } = billSlice.actions;
export default billSlice.reducer;

//  thunks

// export const fetchCategoriesThunk = (appliances) => async (dispatch) => {
//     if (appliances === 'pooja' || appliances === 'creative' || appliances === '') {
//         dispatch(getCategoriesLoading(true));
//         try {
//             const { data } = await Api.getCategories(appliances);
//             dispatch(getCategories(data.data));
//             dispatch(getCategoriesLoading(false));
//         } catch (err) {
//             dispatch(getCategoriesError(err));
//             dispatch(getCategoriesLoading(false));
//         }
//     }

// }

export const submitBillThunk = (bill) => async (dispatch) => {
    // here bill is an object
    dispatch(submitBillLoading(true));
    try {
        const { data } = await Api.submitBill(bill);
        dispatch(submitBillSuccess(data.data));
        dispatch(submitBillLoading(false));
    } catch (err) {
        dispatch(submitBillError(err));
        dispatch(submitBillLoading(false));
    }
}