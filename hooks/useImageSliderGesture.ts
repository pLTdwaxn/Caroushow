import { Gesture } from "react-native-gesture-handler";
import {
  Easing,
  ReduceMotion,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useDispatch } from "react-redux";
import { setOffsetY } from "@/store/slices/sliceSlice";

const useImageSliderGesture = (offsetY: number) => {
  const dispatch = useDispatch();

  const originalOffsetY = useSharedValue(offsetY);
  const deltaY = useSharedValue(0);
  const updatedOffsetY = useDerivedValue(
    () => originalOffsetY.value + deltaY.value
  );

  const dispatchOffsetY = (newOffsetY: number) => {
    dispatch(setOffsetY(newOffsetY));
  };

  const UPPER_BOUND = -300;

  const animationConfig = {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    reduceMotion: ReduceMotion.System,
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      deltaY.value = e.translationY;
      runOnJS(dispatchOffsetY)(updatedOffsetY.value);
    })
    .onEnd(() => {
      originalOffsetY.value = updatedOffsetY.value;
      deltaY.value = 0;

      if (originalOffsetY.value > 0) {
        originalOffsetY.value = withTiming(0, animationConfig, () => {
          runOnJS(dispatchOffsetY)(0);
        });
      } else if (originalOffsetY.value < UPPER_BOUND) {
        originalOffsetY.value = withTiming(UPPER_BOUND, animationConfig, () => {
          runOnJS(dispatchOffsetY)(UPPER_BOUND);
        });
      }
    });

  return { pan, updatedOffsetY };
};

export default useImageSliderGesture;
