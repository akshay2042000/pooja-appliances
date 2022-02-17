import { createSlice } from "@reduxjs/toolkit";
import Api from '../api/index';


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        userList: [],
        userListLoading: false,
        userListError: false,
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
        },
        getUserListStart: (state) => {
            state.userListLoading = true;
        },
        getUserListSuccess: (state, action) => {
            state.userListLoading = false;
            state.userList = action.payload;
            state.userListError = false;
        },
        getUserListFailure: (state) => {
            state.userListLoading = false;
            state.userListError = true;
        },
        deleteUserStart: (state) => {
            state.userListLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.userListLoading = false;
            // filter through the userList and remove the user with the id of the payload
            state.userList = state.userList.filter(user => user._id !== action.payload._id);
            state.userListError = false;
        },
        deleteUserFailure: (state) => {
            state.userListLoading = false;
            state.userListError = true;
        },

    },
});

export const { loginStart, loginSuccess, loginFailure, logOut, getUserListStart, getUserListSuccess, getUserListFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } = userSlice.actions;
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

export const getUserListThunk = () => async (dispatch) => {
    dispatch(getUserListStart());
    try {
        const { data } = await Api.getUserList();
        dispatch(getUserListSuccess(data.data));
    }
    catch (err) {
        dispatch(getUserListFailure());
    }
}

export const deleteUserThunk = (id) => async (dispatch) => {
    dispatch(deleteUserStart());
    try {
        console.log(id)
        const { data } = await Api.deleteUser(id);
        dispatch(deleteUserSuccess(data.data));
    }
    catch (err) {
        dispatch(deleteUserFailure());
    }
}

