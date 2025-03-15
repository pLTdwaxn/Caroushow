import { socialMediaState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import socialMediaList from '@/fixtures/socialMediaList';

const initialState: socialMediaState = {
  name: socialMediaList[0].name,
  minRatio: socialMediaList[0].minRatio,
  maxRatio: socialMediaList[0].maxRatio,
};

const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    setSocialMedia: (state, action: PayloadAction<socialMediaState>) => {
      state.name = action.payload.name;
      state.minRatio = action.payload.minRatio;
      state.maxRatio = action.payload.maxRatio;
    },
  },
});

export const { setSocialMedia } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
