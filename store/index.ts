import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";
import sliceReducer from "./slices/sliceSlice";
import deviceReducer from "./slices/deviceSlice";

const store = configureStore({
  reducer: {
    device: deviceReducer,
    image: imageReducer,
    slice: sliceReducer,
  },
});

export default store;
