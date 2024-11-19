import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';

import { periodActions } from './periodSlice/slice';

const usePeriodActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(periodActions, dispatch);
};

export { usePeriodActions };
