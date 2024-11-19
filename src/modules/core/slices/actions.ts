import { useDispatch } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';

import { bannerActions } from './bannerSlice/slice';

const useBannerActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(bannerActions, dispatch);
};

export { useBannerActions };
