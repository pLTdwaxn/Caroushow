import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { cropperParamsReducer } from './reducers/cropperParams';
import { imageReducer } from './reducers/image';
import { resultsReducer } from './reducers/results';

const rootReducer = combineReducers({
  cropperParams: cropperParamsReducer,
  image: imageReducer,
  results: resultsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
