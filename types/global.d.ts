declare module "@/types" {
  export { ImagePickerAsset, ImagePickerOptions } from "expo-image-picker";

  export interface DeviceState {
    width: number;
    height: number;
  }

  export interface ImageState {
    asset: ImagePickerAsset | null;
  }

  export interface SliceState {
    offsetY: number;
    ratio: number;
    slices: number;
  }

  export interface RootState {
    device: DeviceState;
    image: ImageState;
    slice: SliceState;
  }
}
