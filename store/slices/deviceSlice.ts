import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceState } from '@/types';

const initialState: DeviceState = {
  screenWidth: 0,
  screenHeight: 0,
  topActionsBarHeight: 0,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevice: (
      state,
      action: PayloadAction<{ screenWidth: number; screenHeight: number }>
    ) => {
      state.screenWidth = action.payload.screenWidth;
      state.screenHeight = action.payload.screenHeight;
    },
    setTopActionsBarHeight: (state, action: PayloadAction<number>) => {
      state.topActionsBarHeight = action.payload;
    },
  },
});

export const { setDevice, setTopActionsBarHeight } = deviceSlice.actions;
export default deviceSlice.reducer;
