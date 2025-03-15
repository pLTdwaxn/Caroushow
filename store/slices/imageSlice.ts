import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageState, ImagePickerAsset } from '@/types';

const initialState: ImageState = {
  asset: null,
  aspectRatio: 1,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<ImagePickerAsset>) => {
      state.asset = action.payload;
      state.aspectRatio = action.payload.height / action.payload.width;
    },
    resetImage: (state) => {
      state.asset = null;
      state.aspectRatio = 1;
    },
  },
});

export const { setImage, resetImage } = imageSlice.actions;
export default imageSlice.reducer;
