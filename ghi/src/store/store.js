import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { tripsApi } from './tripsApi'
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../auth/auth';
import SignupReducer, { signupReducer } from '../SignupSlice';

export const store= configureStore({
    reducer: {
        signup: SignupReducer,
        [tripsApi.reducerPath]: tripsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat([tripsApi.middleware, authApi.middleware]),
});

setupListeners(store.dispatch)