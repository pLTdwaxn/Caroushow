import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slices/imageSlice";
import sliceReducer from "./slices/sliceSlice";

const store = configureStore({
  reducer: {
    image: imageReducer,
    slice: sliceReducer,
  },
});

export default store;
