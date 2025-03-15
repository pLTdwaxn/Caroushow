import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './slices/imageSlice';
import paramReducer from './slices/paramSlice';
import appReducer from './slices/appSlice';
import socialMediaReducer from './slices/socialMediaSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    image: imageReducer,
    param: paramReducer,
    socialMedia: socialMediaReducer,
  },
});

export default store;
