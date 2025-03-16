declare module '@/types' {
  export { ImagePickerAsset, ImagePickerOptions } from 'expo-image-picker';

  export interface AppState {
    screen: {
      width: number;
      height: number;
    };
    topActionsBar: {
      height: number;
    };
    cropArea: {
      width: number;
      height: number;
      minHeight: number;
      maxHeight: number;
    };
    cropShade: {
      y: number;
    };
    dragHandle: {
      aspectRatioLabel: number | string;
    };
  }

  export interface ImageState {
    asset: ImagePickerAsset | null;
    aspectRatio: number;
  }

  export interface ParamState {
    y: number;
    aspectRatio: number;
    slices: number;
  }

  export interface socialMediaState {
    name: string;
    minRatio: number;
    maxRatio: number;
  }

  export interface RootState {
    app: AppState;
    image: ImageState;
    param: ParamState;
    socialMedia: socialMediaState;
  }
}
