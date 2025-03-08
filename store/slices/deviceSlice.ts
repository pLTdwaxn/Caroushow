import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeviceState } from "@/types";

const initialState: DeviceState = {
  width: 0,
  height: 0,
};

const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice: (state, action: PayloadAction<DeviceState>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { setDevice } = deviceSlice.actions;
export default deviceSlice.reducer;
