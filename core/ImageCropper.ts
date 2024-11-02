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

  private constructor(image: ImagePickerAsset, options: CropperOptions) {
    this.image = image;
    this.options = options;
  }

  static getInstance(
    image: ImagePickerAsset,
    options: CropperOptions
  ): ImageCropper {
    if (!instance) {
      instance = new ImageCropper(image, options);
    } else {
      instance.setImage(image);
      instance.setOptions(options);
    }
    return instance;
  }

  setImage(image: ImagePickerAsset) {
    this.image = image;
  }

  setOptions(options: CropperOptions) {
    this.options = options;
  }

  async run() {
    const croppedImages: ImageResult[] = [];

    const { rows, columns, compress, ratio, resize } = this.options;
    const { width, height } = this.image;

    const pieceWidth = width / columns;
    const pieceHeight = (pieceWidth / ratio.width) * ratio.height;

    const offsetY = (height - pieceHeight * rows) / 2;

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
              resize: {
                height: resize,
              },
            },
          ],
          { compress: compress, format: SaveFormat.JPEG }
        );
        croppedImages.push(cropResult);
      }
    }

    return croppedImages;
  }
}
