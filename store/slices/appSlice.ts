import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types';
import { setSocialMedia } from './socialMediaSlice';

const initialState: AppState = {
  screen: {
    width: 0,
    height: 0,
  },
  topActionsBar: {
    height: 0,
  },
  cropArea: {
    width: 0,
    height: 0,
    minHeight: 0,
    maxHeight: 0,
  },
  cropShade: {
    y: 0,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => ({
    setScreen: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      Object.assign(state.screen, action.payload);
    },
    setTopActionsBar: (state, action: PayloadAction<{ height: number }>) => {
      state.topActionsBar = action.payload;
    },
    setCropArea: (
      state,
      action: PayloadAction<{
        width: number;
        height: number;
      }>
    ) => {
      Object.assign(state.cropArea, action.payload);
    },
    setCropShade: (state, action: PayloadAction<{ y: number }>) => {
      state.cropShade = action.payload;
    },
  }),
  extraReducers: (builder) => {
    builder.addCase(setSocialMedia, (state, action) => {
      state.cropArea.minHeight = state.cropArea.width * action.payload.minRatio;
      state.cropArea.maxHeight = state.cropArea.width * action.payload.maxRatio;
    });
  },
});

export const { setScreen, setTopActionsBar, setCropArea, setCropShade } =
  appSlice.actions;
export default appSlice.reducer;
