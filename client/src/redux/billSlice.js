import { createSlice } from '@reduxjs/toolkit';
import Api from '../api/index';


const initialState = {
    billList: [],
    billListLoading: true,
    billListError: null,
    isBillSubmitting: false,
    billSubmittingError: null,
    submittedBill: null,
    singleBill: null,
    singleBillLoading: true,
    singleBillError: null,
    lastBill: null,
    latestBillsLoading: true,
    latestBillsError: null,
    latestBills: [],
};

const billSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {
        getBillListStart: (state, action) => {
            state.billListLoading = true
        },
        getBillListSuccess: (state, action) => {
            state.billListLoading = false;
            state.billList = action.payload;
            state.billListError = null;
        },
        getBillListFailure: (state, action) => {
            state.billListLoading = false;
            state.billListError = action.payload;
        },

        deleteBillStart: (state) => {
            state.billListLoading = true;
        },
        deleteBillSuccess: (state, action) => {
            state.billListLoading = false;
            state.billList = state.billList.filter(bill => bill._id !== action.payload._id);
            state.billListError = null;
        },
        deleteBillFailure: (state, action) => {
            state.billListLoading = false;
            state.billListError = action.payload;
        },
        submitBillStart: (state) => {
            state.isBillSubmitting = true;
        },
        submitBillSuccess: (state, action) => {
            state.isBillSubmitting = false;
            state.submittedBill = action.payload;
            state.billSubmittingError = null;
        },
        submitBillFailure: (state, action) => {
            state.isBillSubmitting = false;
            state.billSubmittingError = action.payload;
        },
        getSingleBillStart: (state) => {
            state.singleBillLoading = true;
        },
        getSingleBillSuccess: (state, action) => {
            state.singleBillLoading = false;
            state.singleBill = action.payload;
            state.singleBillError = null;
        },
        getSingleBillFailure: (state, action) => {
            state.singleBillLoading = false;
            state.singleBillError = action.payload;
        },
        getLastBill: (state, action) => {
            state.lastBill = action.payload;
        },
        getLatestBillsStart: (state) => {
            state.latestBillsLoading = true;
        },
        getLatestBillsSuccess: (state, action) => {
            state.latestBills = action.payload;
            state.latestBillsLoading = false;
        },
        getLatestBillsFailure: (state, action) => {
            state.latestBillsLoading = false;
            state.latestBillsError = action.payload;
        }
    }
})

export const { submitBillStart, getLatestBillsStart, getLatestBillsSuccess, getLatestBillsFailure, submitBillSuccess, getSingleBillSuccess, submitBillFailure, getBillListStart, getBillListSuccess, getSingleOrderFailure, getSingleOrderSuccess, getLastBill, getSingleBillStart, deleteBillStart, deleteBillFailure, deleteBillSuccess, getBillListFailure } = billSlice.actions;
export default billSlice.reducer;

//  thunks

export const fetchBillListThunk = (form) => async (dispatch) => {
    dispatch(getBillListStart());
    try {
        const { data } = await Api.getBillList(form)
        dispatch(getBillListSuccess(data.data))
    } catch (err) {
        dispatch(getBillListFailure(err));
    }
}

export const deleteBillThunk = (id, bill) => async (dispatch) => {
    dispatch(deleteBillStart());
    try {
        const date = new Date(bill.date);
        const name = bill.app + '_' + bill.invoiceNumber + '_' + date.getDate() + "_" + (date.getMonth() + 1) + "_" + date.getUTCFullYear()
        const { data } = await Api.deleteBill(id, name, bill.order._id)

        dispatch(deleteBillSuccess(data.data))
    } catch (err) {
        dispatch(deleteBillFailure(err));
    }


    //  dispatch TO CHANGE AN ORDER'S ISBilled to false


}

export const getSingleBillThunk = (id) => async (dispatch) => {
    dispatch(getSingleBillStart());
    try {
        const { data } = await Api.getSingleBill(id)
        dispatch(getSingleBillSuccess(data.data))
    } catch (err) {
        dispatch(getSingleOrderFailure(err));
    }
}



export const submitBillThunk = (billData, name, invoiceData) => async (dispatch) => {
    dispatch(submitBillStart());
    try {
        const invoice = await Api.postInvoice(name, invoiceData)
        billData.invoiceBill = {
            path: invoice.data.downloadUrl,
        }
        billData.invoiceViewBill = {
            path: invoice.data.viewUrl,
        }
        const { data } = await Api.submitBill(billData);
        const updatedOrder = await Api.updateOrder(billData.order._id, { ...billData.order, isBilled: true, billingId: data.data._id })
        dispatch(submitBillSuccess(data.data));
    } catch (err) {
        dispatch(submitBillFailure(err));
    }
}

export const getLastBillThunk = (appliance) => async (dispatch) => {
    try {
        const { data } = await Api.getLastBill(appliance);
        dispatch(getLastBill(data.data));
    } catch (err) {
        console.log(err)
    }
}

export const getLatestBillsThunk = () => async (dispatch) => {
    dispatch(getLatestBillsStart());
    try {
        const { data } = await Api.getLatestBills();
        dispatch(getLatestBillsSuccess(data.data));
    } catch (err) {
        dispatch(getLatestBillsFailure(err));
    }
}
