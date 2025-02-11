import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";

export const usePinchGesture = (
  imageWidth: number,
  imageHeight: number,
  cropperParams: any
) => {
  // const screenWidth = Dimensions.get("window").width;
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  // const maxScale = Math.min(
  //   imageWidth / screenWidth,
  //   imageHeight /
  //     ((screenWidth / cropperParams.ratio.width) * cropperParams.ratio.height)
  // );
  const maxScale = 2;

  const pinch = Gesture.Pinch()
    .onStart(() => {})
    .onUpdate((event) => {
      scale.value = parseFloat((savedScale.value * event.scale).toFixed(2));
    })
    .onEnd(() => {
      if (scale.value < 1) {
        savedScale.value = 1;
        scale.value = withTiming(1, {
          duration: 200,
          easing: Easing.linear,
        });
      } else if (scale.value > maxScale) {
        savedScale.value = maxScale;
        scale.value = withTiming(maxScale, {
          duration: 200,
          easing: Easing.linear,
        });
      } else {
        savedScale.value = scale.value;
      }
    });

  return { pinch, scale };
};

export const usePanGesture = (scale: any) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const baseTranslateX = useSharedValue(0);
  const baseTranslateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {})
    .onUpdate((event) => {
      const newTranslateX = Math.floor(
        baseTranslateX.value + event.translationX / scale.value
      );
      const newTranslateY = Math.floor(
        baseTranslateY.value + event.translationY / scale.value
      );

      translateX.value = newTranslateX;
      translateY.value = newTranslateY;
    })
    .onEnd(() => {
      baseTranslateX.value = translateX.value;
      baseTranslateY.value = translateY.value;
      console.log("baseTranslateX", baseTranslateX.value);
      console.log("baseTranslateY", baseTranslateY.value);
    });

  return { pan, translateX, translateY };
};
