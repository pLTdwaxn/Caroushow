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
import store from '@/store';
import { setCropArea } from '@/store/slices/appSlice';

export const useCropOverlayGestures = () => {
  const state = store.getState();
  const { width, height, minHeight, maxHeight } = state.app.cropArea;

  const dispatch = useDispatch();
  const dispatchNewHeight = (newHeight: number) => {
    dispatch(setCropArea({ width: width, height: newHeight }));
  };

  const startHeight = useSharedValue(height);
  const deltaY = useSharedValue(0);
  const endHeight = useDerivedValue(() => startHeight.value + deltaY.value);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      deltaY.value = e.translationY;
      runOnJS(dispatchNewHeight)(endHeight.value);
    })
    .onEnd(() => {
      startHeight.value = endHeight.value;
      deltaY.value = 0;

      if (endHeight.value < minHeight) {
        startHeight.value = withTiming(minHeight, animationConfig, () => {
          runOnJS(dispatchNewHeight)(minHeight);
        });
      }

      if (endHeight.value > maxHeight) {
        startHeight.value = withTiming(maxHeight, animationConfig, () => {
          runOnJS(dispatchNewHeight)(maxHeight);
        });
      }
    });

  const animationConfig = {
    duration: 300,
    easing: Easing.inOut(Easing.poly(4)),
    reduceMotion: ReduceMotion.System,
  };

  const tap = Gesture.Tap().onEnd(() => {});

  const composedGesture = Gesture.Race(pan, tap);

  return {
    composedGesture,
    endHeight,
  };
};
