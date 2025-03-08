import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  offsetY: 0,
  aspectRatio: 1,
  slices: 3,
};

const paramSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setOffsetY: (state, action: PayloadAction<number>) => {
      state.offsetY = action.payload;
    },
    setAspectRatio: (state, action: PayloadAction<number>) => {
      state.aspectRatio = action.payload;
    },
    setSlices: (state, action: PayloadAction<number>) => {
      state.slices = action.payload;
    },
  },
});

export const { setOffsetY, setAspectRatio, setSlices } = paramSlice.actions;
export default paramSlice.reducer;
