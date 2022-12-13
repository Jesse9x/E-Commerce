import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import { Layout } from '../components';
import { Cart, Checkout, Home, Login, Register } from '../pages';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
        </>
    )
);
