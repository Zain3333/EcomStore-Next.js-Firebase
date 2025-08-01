import { configureStore } from '@reduxjs/toolkit';
// import your reducers here

import productsReducer from '../features/productsSlice';
import cartReducer from '../features/cartSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
  // Redux Toolkit includes thunk by default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
