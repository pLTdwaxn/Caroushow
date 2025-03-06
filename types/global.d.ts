declare module "@/types" {
  export { ImagePickerAsset, ImagePickerOptions } from "expo-image-picker";

  export interface ImageState {
    asset: ImagePickerAsset | null;
  }

  export interface SliceState {
    offsetY: number;
    ratio: Ratio;
    slices: number;
  }

  export interface RootState {
    image: ImageState;
    slice: SliceState;
  }

  export interface Ratio {
    w?: number;
    h?: number;
    fraction?: string;
    decimal: number;
  }
}
