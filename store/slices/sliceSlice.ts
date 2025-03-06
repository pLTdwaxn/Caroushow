import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ratio } from "@/types";

// Ranked from most square to most rectangular
const ratioPresets = [
  { w: 12, h: 12, fraction: "1:1", decimal: 1.0 }, // 1.0
  { w: 12, h: 15, fraction: "5:4", decimal: 1.25 }, // 0.8
  { w: 12, h: 16, fraction: "4:3", decimal: 1.33 }, // 0.75
  { w: 12, h: 18, fraction: "3:2", decimal: 1.5 }, // 0.67
];

const initialState = {
  offsetY: 0,
  ratio: ratioPresets[0],
  slices: 3,
};

const sliceSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    setOffsetY: (state, action: PayloadAction<number>) => {
      state.offsetY = action.payload;
    },
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

export const { setOffsetY, setRatio, cycleRatio, setSlices } =
  sliceSlice.actions;
export default sliceSlice.reducer;
