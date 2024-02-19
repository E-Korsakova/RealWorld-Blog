import { configureStore } from '@reduxjs/toolkit';

import fetchReducer from './fetchSlice';
const store = configureStore({
  reducer: {
    fetch: fetchReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
