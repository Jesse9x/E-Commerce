import { createSlice } from '@reduxjs/toolkit';

const checkOutSlice = createSlice({
    name: 'checkout',
    initialState: {
        address: {},
        payment: {},
    },
    reducers: {
        updateAddress: (state, action) => {
            const { payload } = action;
            state.address = { ...state.address, ...payload };
        },
        updatePayment: (state, action) => {
            const { payload } = action;
            state.payment = { ...state.payment, ...payload };
        },
        removeCheckoutInfo: (state) => {
            state.address = {};
            state.payment = {};
        },
    },
});

export const { updateAddress, updatePayment, removeCheckoutInfo } = checkOutSlice.actions;

export default checkOutSlice.reducer;
