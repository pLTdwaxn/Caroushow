import { ImagePickerAsset } from "expo-image-picker";
import { ImageResult } from "expo-image-manipulator";

import ImageCropper from "@/core/ImageCropper";
import { Processes } from "@/types";

// Action types
export const RESET_IMAGE = "RESET_IMAGE";
export const SET_RESULTS = "SET_RESULTS";
export const CYCLE_ASPECT_RATIOS = "CYCLE_ASPECT_RATIOS";
export const CYCLE_COLUMNS = "CYCLE_COLUMNS";
export const FETCH_CROPPED_IMAGES = "FETCH_CROPPED_IMAGES";
export const FETCH_CROPPED_IMAGES_SUCCESS = "FETCH_CROPPED_IMAGES_SUCCESS";
export const FETCH_CROPPED_IMAGES_FAILURE = "FETCH_CROPPED_IMAGES_FAILURE";

// Action creators
export const fetchImage = () => ({
  type: "FETCH_IMAGE",
  payload: null,
});

export const fetchImageSuccess = (image: ImagePickerAsset) => ({
  type: "FETCH_IMAGE_SUCCESS",
  payload: image,
});

export const fetchImageFailure = () => ({
  type: "FETCH_IMAGE_FAILURE",
  payload: null,
});

export const resetImage = () => ({
  type: RESET_IMAGE,
  payload: null,
});

export const resetResults = () => ({
  type: "RESET_RESULTS",
  payload: null,
});

export const cycleAspectRatios = () => ({
  type: CYCLE_ASPECT_RATIOS,
  payload: null,
});

export const cycleColumns = () => ({
  type: "CYCLE_COLUMNS",
  payload: null,
});

export const fetchCroppedImages = () => ({
  type: "FETCH_CROPPED_IMAGES",
  payload: null,
});

export const fetchCroppedImagesSuccess = (imageResults: ImageResult[]) => ({
  type: "FETCH_CROPPED_IMAGES_SUCCESS",
  payload: imageResults,
});

export const fetchCroppedImagesFailure = () => ({
  type: "FETCH_CROPPED_IMAGES_FAILURE",
  payload: null,
});

// Thunks
export const runCropper = () => {
  return async (
    dispatch: (action: any) => void,
    getState: () => { image: any; cropperParams: any }
  ) => {
    dispatch(fetchCroppedImages());
    const { image, cropperParams } = getState();
    const imageCropper = ImageCropper.getInstance()
      .setImage(image.data)
      .setOptions(cropperParams);
    try {
      await imageCropper.run().then((results) => {
        dispatch(fetchCroppedImagesSuccess(results));
      });
    } catch (error) {
      console.log(error);
      dispatch(fetchCroppedImagesFailure());
    }
  };
};

export const setImage = (image: ImagePickerAsset) => {
  return async (dispatch: (action: any) => void) => {
    dispatch(fetchImage());
    try {
      await dispatch(fetchImageSuccess(image));
    } catch (error) {
      console.log(error);
      dispatch(fetchImageFailure());
    }
  };
};

export const reset = () => {
  return async (dispatch: (action: any) => void) => {
    dispatch(resetImage());
    dispatch(resetResults());
  };
};
