import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import cartSlice from '../reducers/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
