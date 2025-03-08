import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { connect } from "react-redux";

import CropOverlay from "@/components/cropOverlay/CropOverlay";
import { ImageState } from "@/types";
import { GestureDetector } from "react-native-gesture-handler";

import usePanGesture from "@/hooks/useImageSliderGesture";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

type ImageSliderProps = {
  image: ImageState;
  offsetY: number;
};

const ImageSlider = ({ image, offsetY }: ImageSliderProps) => {
  const imageWidth = image.asset ? image.asset.width : 0;
  const imageHeight = image.asset ? image.asset.height : 0;

  const { pan, offsetDelta } = usePanGesture(offsetY);

  const imageContainerDimensions = {
    width: screenWidth * 3,
    height: imageWidth
      ? (screenWidth * 3 * imageHeight) / imageWidth
      : screenHeight,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetY + offsetDelta.value }],
  }));

  return (
    image.asset && (
      <View style={styles.imageSlider}>
        <GestureDetector gesture={pan}>
          <Animated.ScrollView
            horizontal
            snapToInterval={screenWidth}
            decelerationRate="fast"
          >
            <View style={[imageContainerDimensions, styles.imageContainer]}>
              <Animated.Image
                style={[styles.image, animatedStyle]}
                source={{ uri: image.asset.uri }}
                resizeMode="contain"
              />
            </View>
          </Animated.ScrollView>
        </GestureDetector>
        <CropOverlay />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    flex: 1,
    justifyContent: "flex-start",
  },
  imageContainer: {
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
    offsetY: state.slice.offsetY,
  };
};

export default connect(mapStateToProps)(ImageSlider);
