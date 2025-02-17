import { useState } from "react";
import { connect, useSelector } from "react-redux";

import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { ImagePickerAsset } from "expo-image-picker";

import CropOverlay from "@/components/create/CropOverlay";

import { usePinchGesture, usePanGesture } from "@/utils/animationUtils";
// import { Processes } from "@/types";

type ImagePreviewProps = {
  image: {
    data: ImagePickerAsset;
    isLoading: boolean;
    error: any;
  };
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  const [imageRendered, setImageRendered] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = image.data.width;
  const imageHeight = image.data.height;

  const { pinch, scale } = usePinchGesture(imageWidth, imageHeight);
  const { pan, translateX, translateY } = usePanGesture(scale);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const imageWrapperStyle = {
    width: screenWidth,
    height: screenWidth * (imageHeight / imageWidth),
  };

  const calculatedDimensions = () => {
    const screenWidth = Dimensions.get("screen").width;
    const calculatedWidth = screenWidth;
    const columns = useSelector((state: any) => state.cropperParams.columns);
    const ratio = useSelector((state: any) => state.cropperParams.ratio);
    const calculatedHeight =
      (screenWidth / columns) * (ratio.height / ratio.width) + 50;
    return { width: calculatedWidth, height: calculatedHeight };
  };

  return (
    <View style={[styles.imageContainer, calculatedDimensions()]}>
      <GestureDetector gesture={Gesture.Simultaneous(pinch, pan)}>
        <View style={imageWrapperStyle}>
          <Animated.Image
            source={{ uri: image.data.uri }}
            style={[styles.imageStyle, animatedStyle]}
            resizeMode="center"
            onLoad={() => setImageRendered(true)}
          />
          {imageRendered && <CropOverlay />}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state: any) => {
  return {
    translation: state.translation,
    scale: state.scale,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);
