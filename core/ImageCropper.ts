import { ImagePickerAsset } from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

type CropperOptions = {
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
  image: ImagePickerAsset | null;
  options: CropperOptions | null;

  private constructor() {
    this.image = null;
    this.options = null;
  }

  static getInstance(): ImageCropper {
    if (!instance) {
      instance = new ImageCropper();
    }
    return instance;
  }

  setImage(image: ImagePickerAsset) {
    this.image = image;
    return this;
  }

  setOptions(options: CropperOptions) {
    this.options = options;
    return this;
  }

  async run() {
    if (!this.image || !this.options) {
      throw new Error(
        "Image and options must be set before running the cropper"
      );
    }

    const { columns, compress, ratio, resize } = this.options;
    const { width, height, uri } = this.image;

    const pieceWidth = Math.floor(width / columns); // Round here to avoid rounding during cropping which may cause blank gaps
    const pieceHeight = (pieceWidth / ratio.width) * ratio.height;

    const offsetY = (height - pieceHeight) / 2;
    const resizeOptions =
      pieceWidth > pieceHeight ? { height: resize } : { width: resize };

    const croppedImages: ImageManipulator.ImageResult[] = [];

    // Generate an array of originXs for each column
    const originXs = Array.from({ length: columns }, (_, i) => i * pieceWidth);
    const cropOptionsMap = originXs.map((originX) => {
      return {
        originX: originX,
        originY: offsetY,
        width: pieceWidth,
        height: pieceHeight,
      };
    });

    const cropJobs = cropOptionsMap.map(
      async (cropOptions) =>
        await ImageManipulator.ImageManipulator.manipulate(uri)
          .crop(cropOptions)
          .resize(resizeOptions)
          .renderAsync()
          .then(async (ref) => {
            return await ref.saveAsync({
              compress: compress,
              format: ImageManipulator.SaveFormat.JPEG,
            });
          })
    );

    croppedImages.push(...(await Promise.all(cropJobs)));

    return croppedImages;
  }
}
