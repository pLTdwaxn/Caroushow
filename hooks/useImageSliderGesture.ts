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
import { setOffsetY } from '@/store/slices/paramSlice';

const useImageSliderGesture = (offsetY: number, cropStartHeight: number) => {
  const dispatch = useDispatch();

  const originalOffsetY = useSharedValue(offsetY + cropStartHeight);
  const deltaY = useSharedValue(0);
  const updatedOffsetY = useDerivedValue(
    () => originalOffsetY.value + deltaY.value
  );

  const LOWER_BOUND = cropStartHeight;
  const UPPER_BOUND = -300;

  const dispatchOffsetY = (newOffsetY: number) => {
    dispatch(setOffsetY(newOffsetY));
  };

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
      if (originalOffsetY.value > LOWER_BOUND) {
        originalOffsetY.value = withTiming(LOWER_BOUND, animationConfig, () => {
          runOnJS(dispatchOffsetY)(LOWER_BOUND);
        });
      } else if (originalOffsetY.value < UPPER_BOUND) {
        originalOffsetY.value = withTiming(UPPER_BOUND, animationConfig, () => {
          runOnJS(dispatchOffsetY)(UPPER_BOUND);
        });
      }
    });

  const tap = Gesture.Tap().onBegin(() => {});

  const composedGesture = Gesture.Race(pan, tap);

  return { composedGesture, updatedOffsetY };
};

export default useImageSliderGesture;
