import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    appliances: "",
}

const applianceSlice = createSlice({
    name: 'appliance',
    initialState,
    reducers: {
        setAppliances: (state, action) => {
            if (action.payload === 'pooja' || action.payload === 'creative' || action.payload === '')
                state.appliances = action.payload;
        }
    }
})

export const { setAppliances } = applianceSlice.actions;
export default applianceSlice.reducer;