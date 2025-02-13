import * as ImagePicker from "expo-image-picker";
import { store } from "@/store";
import { setImage } from "@/store/actions";

export const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    quality: 1,
    allowsEditing: true,
  });

  if (!result.canceled) {
    let image = {
      uri: result.assets[0].uri,
      width: result.assets[0].width,
      height: result.assets[0].height,
    };

    store.dispatch(setImage(image));
  }
};
