import { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import CropGuide from "@/components/create/CropGuide";
import ImageSelectButton from "@/components/create/ImageSelectButton";

type Props = {
  uri: string | undefined;
};

const ImageViewer = ({ uri }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return uri ? (
    <View style={styles.container}>
      <Image
        source={{ uri: uri }}
        style={styles.imageStyle}
        contentFit="contain"
        onLoad={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <View style={styles.cropGuideContainer}>
          <CropGuide />
        </View>
      )}
    </View>
  ) : (
    <ImageSelectButton />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  cropGuideContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = (state: any) => ({
  uri: state.image?.uri,
});

export default connect(mapStateToProps)(ImageViewer);
