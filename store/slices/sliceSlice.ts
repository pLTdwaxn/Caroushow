import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  offsetY: 0,
  ratio: 1,
  slices: 3,
};

const sliceSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setOffsetY: (state, action: PayloadAction<number>) => {
      // console.log("setOffsetY", action.payload);
      state.offsetY = action.payload;
    },
    setRatio: (state, action: PayloadAction<number>) => {
      state.ratio = action.payload;
    },
    setSlices: (state, action: PayloadAction<number>) => {
      state.slices = action.payload;
    },
  },
});

export const { setOffsetY, setRatio, setSlices } = sliceSlice.actions;
export default sliceSlice.reducer;
