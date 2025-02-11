declare module "@/types" {
  import { ImagePickerAsset } from "expo-image-picker";
  import { ImageResult } from "expo-image-manipulator";

  export interface ImageState {
    data: ImagePickerAsset;
    isLoading: boolean;
    error: any;
  }

  export interface CropperParams {
    ratio: {
      width: number;
      height: number;
    };
    rows: number;
    columns: number;
  }

  export interface ImageResultState {
    data: ImageResult[];
    isLoading: boolean;
    error: any;
  }

  export interface Processes {
    scale: number;
    translation: {
      x: number;
      y: number;
    };
    compress: number;
    resize: number;
    aspectRatio: {
      width: number;
      height: number;
    };
    split: {
      rows: number;
      columns: number;
    };

    // To be deprecated
    ratio: {
      width: number;
      height: number;
    };
    columns: number;
  }
}
