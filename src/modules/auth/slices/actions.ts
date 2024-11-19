import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';

import { authActions } from './auth/slice';

const useAuthActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(authActions, dispatch);
};

export { useAuthActions };
