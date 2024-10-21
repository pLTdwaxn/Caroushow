import {
  ImageResult,
  manipulateAsync,
  SaveFormat,
} from "expo-image-manipulator";

type CropOptions = {
  rows: number;
  cols: number;
  compress: number;
};

export default class ImageCropper {
  image: string;
  options: CropOptions;

  constructor(image: string, options: CropOptions) {
    this.image = image;
    this.options = options;
  }

  async run() {
    const { rows, cols, compress } = this.options;
    const croppedImages: ImageResult[] = [];

    const imageInfo = await manipulateAsync(this.image, []);
    const { width, height } = imageInfo;

    const pieceWidth = width / cols;
    const pieceHeight = height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cropResult = await manipulateAsync(
          this.image,
          [
            {
              crop: {
                originX: col * pieceWidth,
                originY: row * pieceHeight,
                width: pieceWidth,
                height: pieceHeight,
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
