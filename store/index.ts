import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";
import paramReducer from "./slices/paramSlice";
import deviceReducer from "./slices/deviceSlice";
import socialMediaReducer from "./slices/socialMediaSlice";

const store = configureStore({
  reducer: {
    device: deviceReducer,
    image: imageReducer,
    param: paramReducer,
    socialMedia: socialMediaReducer,
  },
});

export default store;
