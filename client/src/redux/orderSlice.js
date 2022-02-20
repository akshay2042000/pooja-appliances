import { createSlice } from "@reduxjs/toolkit";
import Api from '../api/index';


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orderList: [],
        orderListLoading: true,
        orderListError: null,
        singleOrder: null,
        singleOrderLoading: true,
        singleOrderError: null,
        // orderForm: {
        //     orderId: null,
        //     orderDate: null,
        //     orderStatus: null,
        //     orderTotal: null,
        //     orderItems: [],
        //     orderCustomer: null,
        //     orderCompany: null,
        // }
    },
    reducers: {
        getOrderListStart: (state) => {
            state.orderListLoading = true;
        },
        getOrderListSuccess: (state, action) => {
            state.orderListLoading = false;
            state.orderList = action.payload;
            state.orderListError = null;
        },
        getOrderListFailure: (state, action) => {
            state.orderListLoading = false;
            state.orderListError = action.payload;
        },
        deleteOrderStart: (state) => {
            state.orderListLoading = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.orderListLoading = false;
            state.orderList = state.orderList.filter(order => order._id !== action.payload._id);
            state.orderListError = null;
        },
        deleteOrderFailure: (state, action) => {
            state.orderListLoading = false;
            state.orderListError = action.payload;
        },
        getSingleOrderStart: (state) => {
            state.singleOrderLoading = true;
        },
        getSingleOrderSuccess: (state, action) => {
            state.singleOrderLoading = false;
            state.singleOrder = action.payload;
            state.singleOrderError = null;
        },
        getSingleOrderFailure: (state, action) => {
            state.singleOrderLoading = false;
            state.singleOrderError = action.payload;
        }
    },
});

export const { getOrderListStart, getOrderListSuccess, getOrderListFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure, getSingleOrderStart, getSingleOrderSuccess, getSingleOrderFailure } = orderSlice.actions;
export default orderSlice.reducer;


export const getOrderListThunk = (form) => async (dispatch) => {
    dispatch(getOrderListStart());
    try {
        const { data } = await Api.getOrderList(form);
        dispatch(getOrderListSuccess(data.data));
    }
    catch (err) {
        dispatch(getOrderListFailure(err));
    }
}

export const deleteOrderThunk = (id) => async (dispatch) => {
    dispatch(deleteOrderStart());
    try {
        console.log(id)
        const { data } = await Api.deleteOrder(id);
        dispatch(deleteOrderSuccess(data.data));
    }
    catch (err) {
        dispatch(deleteOrderFailure(err));
    }
}

export const getSingleOrderThunk = (id) => async (dispatch) => {
    dispatch(getSingleOrderStart());
    try {
        const { data } = await Api.getSingleOrder(id);
        dispatch(getSingleOrderSuccess(data.data));
    }
    catch (err) {
        dispatch(getSingleOrderFailure(err));
    }
}


