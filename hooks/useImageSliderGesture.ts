import { useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { setOffsetY } from "@/store/slices/sliceSlice";

const useImageSliderGesture = (offsetY: number) => {
  const dispatch = useDispatch();
  const offsetDelta = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offsetDelta.set(e.translationY);
    })
    .onEnd(() => {
      const newOffsetY =
        offsetY + offsetDelta.value > 0 ? 0 : offsetY + offsetDelta.value;
      dispatch(setOffsetY(newOffsetY));
      offsetDelta.set(0);
    })
    .runOnJS(true);

  return { pan, offsetDelta };
};

export default useImageSliderGesture;
