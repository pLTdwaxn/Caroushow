import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { useDispatch } from "react-redux";
import { setAspectRatio } from "@/store/slices/paramSlice";

export const useCropOverlayGestures = (
  screenWidth: number,
  initialRatio: number
) => {
  const dispatch = useDispatch();

  const originalHeight = useSharedValue(screenWidth * initialRatio);
  const deltaY = useSharedValue(0);
  const updatedHeight = useDerivedValue(
    () => originalHeight.value + deltaY.value
  );
  const updatedRatio = useDerivedValue(() => updatedHeight.value / screenWidth);

  const dispatchAspectRatio = (AspectRatio: number) => {
    dispatch(setAspectRatio(Number(AspectRatio.toFixed(3))));
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      deltaY.value = e.translationY;
      runOnJS(dispatchAspectRatio)(updatedRatio.value);
    })
    .onEnd(() => {
      originalHeight.value = updatedHeight.value;
      deltaY.value = 0;
    });

  const tap = Gesture.Tap().onEnd(() => {
    console.log("Tapped");
  });

  const composedGesture = Gesture.Race(pan, tap);

  return {
    composedGesture,
    updatedHeight,
  };
};
