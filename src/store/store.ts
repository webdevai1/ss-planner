import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import { periodApi } from '@/modules/dashboard/api/periodApi';

export const reduxStore = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(periodApi.middleware),
});

// Infer the type of makeStore
export type ReduxStore = typeof reduxStore;
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatchType = typeof reduxStore.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
