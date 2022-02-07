import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pooja: {
        items: [],
        count: 0,
        total: 0
    },
    creative: {
        items: [],
        count: 0,
        total: 0
    }

}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const payload = action.payload;
            const app = payload.app
            state[app].items.push(payload);
            state[app].count += payload.quantity;
            state[app].total += payload.quantity * payload.size.price;
        },
    }
})

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

