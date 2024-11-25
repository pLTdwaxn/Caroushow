import { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";

import CropGuide from "@/components/create/CropGuide";
import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";

type Props = {
  uri: string | undefined;
};

const ImageViewer = ({ uri }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return uri ? (
    <View>
      <Image
        source={{ uri: uri }}
        style={styles.imageStyle}
        contentFit="contain"
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && <CropGuide />}
      <View style={styles.actionsBarContainer}>
        <ActionsBar />
      </View>
    </View>
  ) : (
    <ImageSelectButton />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  cropGuideContainer: {
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
  actionsBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
});

export default connect(mapStateToProps)(ImageViewer);
