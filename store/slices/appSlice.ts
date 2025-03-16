import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@/types';
import { setSocialMedia } from './socialMediaSlice';
import { setAspectRatio } from './paramSlice';
import { aspectRatioList } from '@/fixtures/aspectRatioLists';

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
  dragHandle: {
    aspectRatioLabel: 1,
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

      const aspectRatio = Number(
        (action.payload.height / action.payload.width).toFixed(3)
      );

      const matchingAspectRatio = aspectRatioList.find(
        (item) => item.decimal === aspectRatio
      );

      if (matchingAspectRatio) {
        state.dragHandle.aspectRatioLabel = `${matchingAspectRatio.w} : ${matchingAspectRatio.h}`;
      } else {
        state.dragHandle.aspectRatioLabel = aspectRatio;
      }
    },
    setCropShade: (state, action: PayloadAction<{ y: number }>) => {
      state.cropShade = action.payload;
    },
    setAspectRatioLabel: (state, action: PayloadAction<number>) => {
      state.dragHandle.aspectRatioLabel = action.payload;
    },
  }),
  extraReducers: (builder) => {
    builder.addCase(setSocialMedia, (state, action) => {
      state.cropArea.minHeight = state.cropArea.width * action.payload.minRatio;
      state.cropArea.maxHeight = state.cropArea.width * action.payload.maxRatio;
    });
  },
});

export const {
  setScreen,
  setTopActionsBar,
  setCropArea,
  setCropShade,
  setAspectRatioLabel,
} = appSlice.actions;
export default appSlice.reducer;
