import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  ReduceMotion,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useDispatch } from 'react-redux';
import { setAspectRatio } from '@/store/slices/paramSlice';
import store from '@/store';

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
    dispatch(setAspectRatio(AspectRatio));
  };

  const LOWER_BOUND = store.getState().socialMedia.minRatio;
  const UPPER_BOUND = store.getState().socialMedia.maxRatio;

  const animationConfig = {
    duration: 300,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      deltaY.value = e.translationY;
      runOnJS(dispatchAspectRatio)(updatedRatio.value);
    })
    .onEnd(() => {
      originalHeight.value = updatedHeight.value;
      deltaY.value = 0;

      if (updatedRatio.value > UPPER_BOUND) {
        originalHeight.value = withTiming(
          UPPER_BOUND * screenWidth,
          animationConfig,
          () => {
            runOnJS(dispatchAspectRatio)(UPPER_BOUND);
          }
        );
      } else if (updatedRatio.value < LOWER_BOUND) {
        originalHeight.value = withTiming(
          LOWER_BOUND * screenWidth,
          animationConfig,
          () => {
            runOnJS(dispatchAspectRatio)(LOWER_BOUND);
          }
        );
      }
    });

  const tap = Gesture.Tap().onEnd(() => {});

  const composedGesture = Gesture.Race(pan, tap);

  return {
    composedGesture,
    updatedHeight,
  };
};
