import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { cropperParamsReducer } from './reducers/cropperParams';
import { imageReducer } from './reducers/image';
import { targetSocialMediaReducer } from './reducers/targetSocialMedia';
import { resultsReducer } from './reducers/results';

const rootReducer = combineReducers({
  targetSocialMedia: targetSocialMediaReducer,
  cropperParams: cropperParamsReducer,
  image: imageReducer,
  results: resultsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
