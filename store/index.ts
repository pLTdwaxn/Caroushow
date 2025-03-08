import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";
import paramReducer from "./slices/paramSlice";
import deviceReducer from "./slices/deviceSlice";

const store = configureStore({
  reducer: {
    device: deviceReducer,
    image: imageReducer,
    param: paramReducer,
  },
});

export default store;
