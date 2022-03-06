import { createSlice } from "@reduxjs/toolkit";
import Api from '../api/index';


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: null,
        userList: [],
        userListLoading: true,
        userListError: null,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.error = null
            state.currentUser = action.payload;
        },
        loginFailure: (state,action) => {
            state.isFetching = false;
            state.error = action.payload;
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
            state.userListError = null;
        },
        getUserListFailure: (state,action) => {
            state.userListLoading = false;
            state.userListError = action.payload;
        },
        deleteUserStart: (state) => {
            state.userListLoading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.userListLoading = false;
            // filter through the userList and remove the user with the id of the payload
            state.userList = state.userList.filter(user => user._id !== action.payload._id);
            state.userListError = null;
        },
        deleteUserFailure: (state,action) => {
            state.userListLoading = false;
            state.userListError = action.payload;
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
        dispatch(loginFailure(err));
    }
};

export const getUserListThunk = () => async (dispatch) => {
    dispatch(getUserListStart());
    try {
        const { data } = await Api.getUserList();
        dispatch(getUserListSuccess(data.data));
    }
    catch (err) {
        dispatch(getUserListFailure(err));
    }
}

export const deleteUserThunk = (id) => async (dispatch) => {
    dispatch(deleteUserStart());
    try {
        const { data } = await Api.deleteUser(id);
        dispatch(deleteUserSuccess(data.data));
    }
    catch (err) {
        dispatch(deleteUserFailure(err));
    }
}

