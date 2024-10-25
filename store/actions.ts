export const SET_IMAGE = 'SET_IMAGE';
export const SET_RESULTS = 'SET_RESULTS';

import { ImagePickerAsset } from "expo-image-picker";
import { ImageResult } from "expo-image-manipulator";

export const setImage = (image: ImagePickerAsset) => ({
  type: SET_IMAGE,
  payload: image,
});

export const resetImage = () => ({
  type: SET_IMAGE,
  payload: { uri: null, width: null, height: null },
});

export const setResults = (results: ImageResult | null) => ({
  type: SET_RESULTS,
  payload: results,
});
