import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { connect } from "react-redux";

import CropOverlay from "@/components/cropOverlay/CropOverlay";
import { ImageState } from "@/types";
import { GestureDetector } from "react-native-gesture-handler";

import usePanGesture from "@/hooks/useImageSliderGesture";

const screenWidth = Dimensions.get("window").width;

type ImageSliderProps = {
  image: ImageState;
  offsetY: number;
  slices: number;
};

const ImageSlider = ({ image, offsetY, slices }: ImageSliderProps) => {
  const imageWidth = image.asset ? image.asset.width : 0;
  const imageHeight = image.asset ? image.asset.height : 0;

  const { composedGesture, updatedOffsetY } = usePanGesture(offsetY);

  const imageContainerDimensions = {
    width: screenWidth * slices,
    height: (screenWidth * slices * imageHeight) / imageWidth,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: updatedOffsetY.value }],
  }));

  return (
    image.asset && (
      <View style={styles.imageSlider}>
        <GestureDetector gesture={composedGesture}>
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
  imageSlider: {},
  imageContainer: {},
  image: {
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
    offsetY: state.param.offsetY,
    slices: state.param.slices,
  };
};

export default connect(mapStateToProps)(ImageSlider);
