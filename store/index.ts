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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
