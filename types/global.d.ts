declare module "@/types" {
  export { ImagePickerAsset, ImagePickerOptions } from "expo-image-picker";

  export interface ImageState {
    asset: ImagePickerAsset | null;
  }
}
