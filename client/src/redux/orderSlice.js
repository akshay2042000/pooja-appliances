import { createSlice } from "@reduxjs/toolkit";
import Api from '../api/index';


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orderList: [],
        orderListLoading: false,
        orderListError: false,
    },
    reducers: {
        getOrderListStart: (state) => {
            state.orderListLoading = true;
        },
        getOrderListSuccess: (state, action) => {
            state.orderListLoading = false;
            state.orderList = action.payload;
            state.orderListError = false;
        },
        getOrderListFailure: (state) => {
            state.orderListLoading = false;
            state.orderListError = true;
        },
        deleteOrderStart: (state) => {
            state.orderListLoading = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.orderListLoading = false;
            state.orderList = state.orderList.filter(order => order._id !== action.payload._id);
            state.orderListError = false;
        },
        deleteOrderFailure: (state) => {
            state.orderListLoading = false;
            state.orderListError = true;
        },
    },
});

export const { getOrderListStart, getOrderListSuccess, getOrderListFailure, deleteOrderStart, deleteOrderSuccess, deleteOrderFailure } = orderSlice.actions;
export default orderSlice.reducer;


export const getOrderListThunk = (form) => async (dispatch) => {
    dispatch(getOrderListStart());
    try {
        const { data } = await Api.getOrderList(form);
        dispatch(getOrderListSuccess(data.data));
    }
    catch (err) {
        dispatch(getOrderListFailure());
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
        dispatch(deleteOrderFailure());
    }
}

