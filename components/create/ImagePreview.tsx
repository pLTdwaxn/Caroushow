import { useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { ImagePickerAsset } from "expo-image-picker";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import CropOverlay from "@/components/create/CropOverlay";

type Props = {
  image: {
    data: ImagePickerAsset;
    isLoading: boolean;
    error: any;
  };
  cropperParams: {
    ratio: {
      width: number;
      height: number;
    };
    rows: number;
    columns: number;
  };
};

const ImagePreview = ({ image, cropperParams }: Props) => {
  const [imageRendered, setImageRendered] = useState(false);
  const imageRef = useRef<View>(null);

  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const baseTranslateX = useSharedValue(0);
  const baseTranslateY = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = image.data ? image.data.width : 0;
  const imageHeight = image.data ? image.data.height : 0;

  const pinch = Gesture.Pinch()
    .onStart(() => {
      baseScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = baseScale.value * event.scale;
    })
    .onEnd(() => {
      const maxScale = Math.min(
        imageWidth / screenWidth,
        imageHeight /
          ((screenWidth / cropperParams.ratio.width) *
            cropperParams.ratio.height)
      );
      if (scale.value * screenWidth < screenWidth) {
        scale.value = withTiming(1, { duration: 200 });
      }
      if (scale.value > maxScale) {
        scale.value = withTiming(maxScale, { duration: 200 });
      }
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      baseTranslateX.value = translateX.value;
      baseTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newTranslateX =
        baseTranslateX.value + event.translationX / scale.value;
      const newTranslateY =
        baseTranslateY.value + event.translationY / scale.value;

      const maxTranslateX = (screenWidth * scale.value - screenWidth) / 2;
      const maxTranslateY =
        (screenWidth * (3 / 4) * scale.value - screenWidth * (3 / 4)) / 2;

      translateX.value = Math.max(
        -maxTranslateX,
        Math.min(newTranslateX, maxTranslateX)
      );
      translateY.value = Math.max(
        -maxTranslateY,
        Math.min(newTranslateY, maxTranslateY)
      );
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View
      style={[
        styles.imageContainer,
        {
          width: screenWidth,
          height: screenWidth * (imageHeight / imageWidth),
        },
      ]}
    >
      <GestureDetector gesture={Gesture.Simultaneous(pinch, pan)}>
        <View ref={imageRef} style={styles.imageWrapper}>
          <Animated.Image
            source={{ uri: image.data.uri }}
            style={[styles.imageStyle, animatedStyle]}
            resizeMode="contain"
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
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePreview;
