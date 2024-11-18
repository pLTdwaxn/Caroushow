import { connect } from "react-redux";

import { store } from "@/store";
import { setImage } from "@/store/actions";

import * as ImagePicker from "expo-image-picker";

import Button from "@/components/shared/Button";

const ImageSelectButton = () => {
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

  return <Button label="Select an Image" onPress={pickImageAsync} />;
};

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
  width: state.image?.width,
  height: state.image?.height,
});

const mapDispatchToProps = {
  setImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelectButton);
