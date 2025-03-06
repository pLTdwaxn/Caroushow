import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

import { useDispatch } from "react-redux";

import { setRatio } from "@/store/slices/sliceSlice";

const screenWidth = Dimensions.get("window").width;

export const useCropOverlayGestures = (initialRatio: number) => {
  const dispatch = useDispatch();

  const cropAreaHeight = screenWidth * initialRatio;
  const offsetY = useSharedValue(0);
  const realTimeRatio = useSharedValue(initialRatio.toString());

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetY.set(e.translationY);
      realTimeRatio.set(
        ((cropAreaHeight + offsetY.get()) / screenWidth).toFixed(4)
      );
    })
    .onEnd(() => {
      const newRatio = (cropAreaHeight + offsetY.get()) / screenWidth;
      dispatch(setRatio({ decimal: newRatio }));
      offsetY.set(0);
    })
    .runOnJS(true);

  const tap = Gesture.Tap()
    .onEnd(() => {
      console.log("Tapped");
    })
    .runOnJS(true);

  const composedGesture = Gesture.Race(pan, tap);

  return {
    composedGesture,
    offsetY,
    realTimeRatio,
    cropAreaHeight,
  };
};
