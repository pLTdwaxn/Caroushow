import { connect } from "react-redux";

import { StyleSheet } from "react-native";

import { Image } from "expo-image";

import CropGuide from "@/components/create/CropGuide";
import ImageSelectButton from "@/components/create/ImageSelectButton";

type Props = {
  uri: string | undefined;
};

const ImageViewer = ({ uri }: Props) => {
  return uri ? (
    <Image source={{ uri: uri }} style={styles.imageStyle} contentFit="contain">
      <CropGuide />
    </Image>
  ) : (
    <ImageSelectButton />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
});

export default connect(mapStateToProps)(ImageViewer);
