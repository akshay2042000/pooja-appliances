import { createSlice, current } from '@reduxjs/toolkit';

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
            const index = state[app].items.findIndex(item => (item._id + item.size.val + item.color.name + item.unit) === (payload._id + payload.size.val + payload.color.name + payload.unit))
            if(index >= 0){
               state[app].items[index]= { ...state[app].items[index], quantity: (state[app].items[index].quantity + payload.quantity) }
            }else{
            state[app].items.push(payload);
            }
            state[app].count += payload.quantity;
            state[app].total += payload.quantity * payload.size.price;
        },
        removeItem: (state, action) => {
            const payload = action.payload;
            const app = payload.app
            const index = state[app].items.findIndex(item => (item._id + item.size.val + item.color.name + item.unit) === (payload._id + payload.size.val + payload.color.name + payload.unit))

            state[app].items.splice(index, 1);
            state[app].count -= payload.quantity;
            state[app].total -= payload.quantity * payload.size.price;
        },
        updateItem: (state, action) => {
            const payload = action.payload;
            const app = payload.app
            const index = state[app].items.findIndex(item => (item._id + item.size.val + item.color.name + item.unit) === (payload._id + payload.size.val + payload.color.name + payload.unit))

            if (payload.targetName === 'quantity') {
                state[app].count -= Number(state[app].items[index].quantity);
                state[app].count += Number(payload.targetValue);
                state[app].total -= Number(state[app].items[index].quantity * state[app].items[index].size.price);
                state[app].total += Number(payload.targetValue * state[app].items[index].size.price);
            }
            if (payload.targetName === 'size') {
                state[app].total -= Number(state[app].items[index].quantity * state[app].items[index].size.price);
                state[app].total += Number(payload.targetValue.price * state[app].items[index].quantity);
            }

            state[app].items[index] = { ...state[app].items[index], [payload.targetName]: payload.targetValue }
        },
        clearCart: () => {
            return initialState;
        }
    }
})

export const { addItem, removeItem, updateItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

