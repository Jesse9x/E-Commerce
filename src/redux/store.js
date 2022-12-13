import { configureStore } from '@reduxjs/toolkit';

import { productApi } from './services/apiSlice';
import cartReducer from './features/CartSlice';
import checkOutReducer from './features/CheckoutSlice';

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        cart: cartReducer,
        checkout: checkOutReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});
