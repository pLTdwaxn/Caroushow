import * as ImagePicker from "expo-image-picker";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import store from "@/store";
import { setImage } from "@/store/slices/imageSlice";

export const pickImageAsync = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
    if (result.canceled) {
      return;
    }
    store.dispatch(setImage(result.assets[0]));
  } catch (error) {
    console.error(error);
  }
};

export const sliceImage = () => {
  const { uri, width, height } = store.getState().image.asset;
  const columns = 3;
  const columnWidth = Math.floor(width / columns);

  const { ratio } = store.getState().slice;
  const calculatedHeight = Math.floor((columnWidth / ratio.w) * ratio.h);

  const actions = Array.from({ length: columns }, (_, i) => ({
    crop: {
      originX: i * columnWidth,
      originY: 0,
      width: columnWidth,
      height: calculatedHeight,
    },
  }));

  const saveOptions = {
    compress: 1,
    format: SaveFormat.JPEG,
  };

  const resizeOptions = {};

  Promise.all(
    actions.map(async (action) =>
      ImageManipulator.manipulate(uri).crop(action.crop).renderAsync()
    )
  )
    .then((imageRefs) =>
      Promise.all(
        imageRefs.map(async (imageRef) => await imageRef.saveAsync(saveOptions))
      )
    )
    .then((images) => {
      images.forEach((image) => {
        MediaLibrary.saveToLibraryAsync(image.uri);
      });
    });
};
