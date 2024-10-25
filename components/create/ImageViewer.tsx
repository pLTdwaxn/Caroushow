import { connect } from "react-redux";

import { store } from "@/store";
import { setImage } from "../../store/actions";

import { StyleSheet } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import CropGuide from "@/components/create/CropGuide";
import ImageSelectButton from "@/components/create/ImageSelectButton";

type Props = {
  uri: string;
  width: number;
  height: number;
};

const ImageViewer = (image: Props) => {
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
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

  return image.uri ? (
    <>
      <Image source={{ uri: image.uri }} style={styles.imageStyle} />
      <CropGuide />
    </>
  ) : (
    <ImageSelectButton onPress={pickImageAsync} />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

const mapStateToProps = (state: any) => ({
  uri: state.image.uri,
  width: state.image.width,
  height: state.image.height,
});

const mapDispatchToProps = {
  setImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewer);
