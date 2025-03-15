import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setCropArea } from './appSlice';

const initialState = {
  y: 0,
  aspectRatio: 1,
  slices: 3,
};

const paramSlice = createSlice({
  name: 'param',
  initialState,
  reducers: {
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
    },
    setAspectRatio: (state, action: PayloadAction<number>) => {
      state.aspectRatio = action.payload;
    },
    setSlices: (state, action: PayloadAction<number>) => {
      state.slices = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCropArea, (state, action) => {
      state.aspectRatio = action.payload.height / action.payload.width;
    });
  },
});

export const { setY, setAspectRatio, setSlices } = paramSlice.actions;
export default paramSlice.reducer;
