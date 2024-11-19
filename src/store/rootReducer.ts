import { authSlice } from '@/modules/auth';
import bannerSlice from '@/modules/core/slices/bannerSlice/slice';
import { periodApi } from '@/modules/dashboard/api/periodApi';
import { periodSlice } from '@/modules/dashboard/slices';
import { persistCombineReducers } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem() {
    return Promise.resolve();
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfigRoot = {
  key: 'root',
  storage,
  whitelist: ['auth', 'banner', 'period', 'expense', 'newExpense'],
};

export const rootReducer = persistCombineReducers(persistConfigRoot, {
  auth: authSlice.reducer,
  banner: bannerSlice.reducer,
  period: periodSlice.reducer,
  [periodApi.reducerPath]: periodApi.reducer,
});
