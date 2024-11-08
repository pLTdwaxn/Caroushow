import { store } from "@/store";

import { setResults } from "@/store/actions";

import { ImagePickerAsset } from "expo-image-picker";
import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";

type CropperOptions = {
  rows: number;
  columns: number;
  ratio: {
    width: number;
    height: number;
  };
  resize: number;
  compress: number;
};

let instance: ImageCropper | null = null;

export default class ImageCropper {
  image: ImagePickerAsset;
  options: CropperOptions;

  private constructor() {
    // this.image = image;
    // this.options = options;
    this.image = store.getState().image;
    this.options = store.getState().cropperParams;
  }

  static getInstance(
    // image: ImagePickerAsset,
    // options: CropperOptions
  ): ImageCropper {
    if (!instance) {
      instance = new ImageCropper();
    }
    return instance;
  }

  // setImage(image: ImagePickerAsset) {
  //   this.image = image;
  // }

  // setOptions(options: CropperOptions) {
  //   this.options = options;
  // }

  async run() {
    const croppedImages: ImageResult[] = [];

    const { rows, columns, compress, ratio, resize } = this.options;
    const { width, height } = this.image;

    const pieceWidth = Math.floor(width / columns); // Round here to avoid rounding during cropping which may cause blank gaps
    const pieceHeight = (pieceWidth / ratio.width) * ratio.height;

    const offsetY = (height - pieceHeight * rows) / 2;
    const resizeParams = pieceWidth > pieceHeight ? { height: resize } : { width: resize };

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const cropResult = await manipulateAsync(
          this.image.uri,
          [
            {
              crop: {
                originX: col * pieceWidth,
                originY: row * pieceHeight + offsetY,
                width: pieceWidth,
                height: pieceHeight,
              },
            },
            {
              resize: resizeParams,
            },
          ],
          { compress: compress, format: SaveFormat.JPEG }
        );
        croppedImages.push(cropResult);
      }
    }

    // return croppedImages;
    store.dispatch(setResults(croppedImages));
  }
}
