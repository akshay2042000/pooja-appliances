import { createSlice } from "@reduxjs/toolkit";
import Api from '../api/index';


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logOut: (state) => {
            state.currentUser = null;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logOut } = userSlice.actions;
export default userSlice.reducer;


export const loginThunk = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const { data } = await Api.login(username, password);
        dispatch(loginSuccess(data));

    }
    catch (err) {
        dispatch(loginFailure());
    }
};

