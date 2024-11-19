import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthStateType = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number;
};

const initialState: AuthStateType = {
  accessToken: '',
  refreshToken: '',
  expiresIn: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    grantAccess: (
      state,
      action: PayloadAction<Pick<AuthStateType, 'accessToken' | 'refreshToken' | 'expiresIn'>>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
    },
    resetAccessToken: (state) => {
      state.accessToken = '';
    },
    resetAccess: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
