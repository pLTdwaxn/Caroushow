import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ratio } from "@/types";

const initialState = {
  ratio: { w: 1, h: 1 },
  slices: 3,
};

const sliceSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setRatio: (state, action: PayloadAction<Ratio>) => {
      state.ratio = action.payload;
    },
    setSlices: (state, action: PayloadAction<number>) => {
      state.slices = action.payload;
    },
  },
});

export default sliceSlice.reducer;
