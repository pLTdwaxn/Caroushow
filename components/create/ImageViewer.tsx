import React, { useState } from "react";
import { connect } from "react-redux";

import { StyleSheet, Text, View, Dimensions } from "react-native";

import { ImagePickerAsset } from "expo-image-picker";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import CropOverlay from "@/components/create/CropOverlay";
import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";

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

const ImageViewer = ({ image, cropperParams }: Props) => {
  const [imageRendered, setImageRendered] = useState(false);
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const baseTranslateX = useSharedValue(0);
  const baseTranslateY = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const imageWidth = image.data ? image.data.width : 0;
  const imageHeight = image.data ? image.data.height : 0;

  const loadingSplash = <Text style={styles.text}>Loading...</Text>;

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
      translateX.value =
        baseTranslateX.value + event.translationX / scale.value;
      translateY.value =
        baseTranslateY.value + event.translationY / scale.value;
    })
    .onEnd(() => {
      console.log(`x: ${translateX.value}, y: ${translateY.value}`);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const ImagePreview = () => {
    return (
      <View>
        <GestureDetector gesture={Gesture.Simultaneous(pinch, pan)}>
          <>
            <Animated.Image
              source={{ uri: image.data.uri }}
              style={[styles.imageStyle, animatedStyle]}
              resizeMode="contain"
              onLoad={() => setImageRendered(true)}
            />
            {imageRendered && <CropOverlay />}
          </>
        </GestureDetector>
        <ActionsBar />
      </View>
    );
  };

  return (
    (image.isLoading && loadingSplash) ||
    (image.data && <ImagePreview />) || <ImageSelectButton />
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    textAlign: "center",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
  label: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
});

const mapStateToProps = (state: any) => ({
  image: state.image,
  cropperParams: state.cropperParams,
});

export default connect(mapStateToProps)(ImageViewer);
