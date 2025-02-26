import * as ImagePicker from "expo-image-picker";
import store from "../../store";
import { setImage } from "../../store/slices/imageSlice";

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
