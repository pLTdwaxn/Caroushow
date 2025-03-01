import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ratio } from "@/types";

const ratioPresets = [
  { w: 1, h: 1 }, // 1.0
  { w: 4, h: 5 }, // 0.8
  { w: 3, h: 4 }, // 0.75
  { w: 5, h: 7 }, // 0.71
  { w: 2, h: 3 }, // 0.67
  { w: 3, h: 5 }, // 0.6
];
// Ranked from most square to most rectangular

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
    cycleRatio: (state) => {
      const currentIndex = ratioPresets.findIndex(
        (preset) => preset.w === state.ratio.w && preset.h === state.ratio.h
      );
      const nextIndex = (currentIndex + 1) % ratioPresets.length;
      state.ratio = ratioPresets[nextIndex];
    },
    setSlices: (state, action: PayloadAction<number>) => {
      state.slices = action.payload;
    },
  },
});

export const { setRatio, cycleRatio, setSlices } = sliceSlice.actions;
export default sliceSlice.reducer;
