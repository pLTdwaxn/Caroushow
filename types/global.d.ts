declare module '@/types' {
  export { ImagePickerAsset, ImagePickerOptions } from 'expo-image-picker';

  export interface DeviceState {
    screenWidth: number;
    screenHeight: number;
    topActionsBarHeight: number;
  }

  export interface ImageState {
    asset: ImagePickerAsset | null;
  }

  export interface ParamState {
    offsetY: number;
    aspectRatio: number;
    slices: number;
  }

  export interface socialMediaState {
    name: string;
    minRatio: number;
    maxRatio: number;
  }

  export interface RootState {
    device: DeviceState;
    image: ImageState;
    param: ParamState;
    socialMedia: socialMediaState;
  }
}
