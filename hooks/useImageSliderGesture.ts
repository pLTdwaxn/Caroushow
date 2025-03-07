import {
  Easing,
  ReduceMotion,
  runOnJS,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setOffsetY } from "@/store/slices/sliceSlice";

const useImageSliderGesture = (offsetY: number) => {
  const dispatch = useDispatch();
  const offsetDelta = useSharedValue(0);

  const updateOffsetY = (newOffsetY: number) => {
    dispatch(setOffsetY(newOffsetY));
  };

  const UPPER_BOUND = -300;

  const animationConfig = {
    duration: 300,
    easing: Easing.out(Easing.quad),
    reduceMotion: ReduceMotion.System,
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetDelta.set(e.translationY);
    })
    .onEnd(() => {
      const newOffsetY = offsetY + offsetDelta.value;
      if (newOffsetY > 0) {
        offsetDelta.value = withTiming(0, animationConfig, () => {
          runOnJS(updateOffsetY)(0);
        });
      } else if (newOffsetY < UPPER_BOUND) {
        offsetDelta.value = withTiming(UPPER_BOUND, animationConfig, () => {
          runOnJS(updateOffsetY)(UPPER_BOUND);
        });
      } else {
        runOnJS(updateOffsetY)(newOffsetY);
        offsetDelta.set(0);
      }
    })
    .runOnJS(true);

  return { pan, offsetDelta };
};

export default useImageSliderGesture;
