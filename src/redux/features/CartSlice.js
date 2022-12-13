import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.value.push(action.payload);
        },
        increaseCart: (state, action) => {
            const { product, quantity = 1 } = action.payload;

            const existingItem = state.value.find(({ product: item }) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            }
        },
        decreaseCart: (state, action) => {
            const { product } = action.payload;

            const existingItem = state.value.find(({ product: item }) => item.id === product.id);

            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
        deleteToCart: (state, action) => {
            const { product } = action.payload;

            const index = state.value.findIndex(({ product: item }) => item.id === product.id);

            if (index > -1) {
                const existingItem = state.value[index];
                if (existingItem) {
                    state.value.splice(index, 1);
                }
            }
        },
        cleanUpCart: (state) => {
            state.value = [];
        },
    },
});

export const { addToCart, increaseCart, decreaseCart, deleteToCart, cleanUpCart } = cartSlice.actions;

export default cartSlice.reducer;
