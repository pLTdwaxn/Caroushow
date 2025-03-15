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
import { setY } from '@/store/slices/paramSlice';

const useImageSliderGesture = () => {
  const state = store.getState();
  const { y, slices } = state.param;
  const { topActionsBar, cropArea, screen } = state.app;
  const aspectRatio = state.image.aspectRatio;
  const imageContainer = { height: screen.width * slices * aspectRatio };

  const dispatch = useDispatch();
  const dispatchY = (newy: number) => {
    dispatch(setY(newy));
  };

  const startY = useSharedValue(y + topActionsBar.height);
  const deltaY = useSharedValue(0);
  const endY = useDerivedValue(() => startY.value + deltaY.value);

  const minY = topActionsBar.height;
  const maxY = topActionsBar.height + cropArea.height - imageContainer.height;

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      deltaY.value = e.translationY;
      runOnJS(dispatchY)(endY.value);
    })
    .onEnd(() => {
      startY.value = endY.value;
      deltaY.value = 0;

      if (startY.value > minY) {
        startY.value = withTiming(minY, animationConfig, () => {
          runOnJS(dispatchY)(minY);
        });
      }

      if (startY.value < maxY) {
        startY.value = withTiming(maxY, animationConfig, () => {
          runOnJS(dispatchY)(maxY);
        });
      }
    });

  const animationConfig = {
    duration: 300,
    easing: Easing.out(Easing.poly(4)),
    reduceMotion: ReduceMotion.System,
  };

  const tap = Gesture.Tap().onBegin(() => {});

  const composedGesture = Gesture.Race(pan, tap);

  return { composedGesture, endY };
};

export default useImageSliderGesture;
