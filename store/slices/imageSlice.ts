import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageState, ImagePickerAsset } from "@/types";

const initialState: ImageState = {
  asset: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<ImagePickerAsset>) => {
      state.asset = action.payload;
    },
    resetImage: (state) => {
      state.asset = null;
    },
  },
});

export const { setImage, resetImage } = imageSlice.actions;
export default imageSlice.reducer;
