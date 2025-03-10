import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DeviceState } from '@/types';

const initialState: DeviceState = {
  screenWidth: 0,
  screenHeight: 0,
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceState>) => {
      state.screenWidth = action.payload.screenWidth;
      state.screenHeight = action.payload.screenHeight;
    },
  },
});

export const { setDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
