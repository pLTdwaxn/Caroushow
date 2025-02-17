import { store } from "@/store";
import { updateTranslation, updateScale } from "@/store/actions";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";

export const usePinchGesture = (imageWidth: number, imageHeight: number) => {
  // const screenWidth = Dimensions.get("window").width;
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);
  // const maxScale = Math.min(
  //   imageWidth / screenWidth,
  //   imageHeight /
  //     ((screenWidth / cropperParams.ratio.width) * cropperParams.ratio.height)
  // );
  const maxScale = 2;

  const pinch = Gesture.Pinch()
    .onStart(() => {})
    .onUpdate((event) => {
      scale.set(parseFloat((baseScale.get() * event.scale).toFixed(2)));
    })
    .onEnd(() => {
      if (scale.get() < 1) {
        baseScale.set(1);
        scale.set(1);
        store.dispatch(updateScale(1));
      } else if (scale.get() > maxScale) {
        baseScale.set(maxScale);
        scale.set(maxScale);
        store.dispatch(updateScale(maxScale));
      } else {
        baseScale.set(scale.get());
        store.dispatch(updateScale(scale.get()));
      }
    })
    .runOnJS(true);

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
        baseTranslateX.get() + event.translationX / scale.get()
      );
      const newTranslateY = Math.floor(
        baseTranslateY.get() + event.translationY / scale.get()
      );

      translateX.set(newTranslateX);
      translateY.set(newTranslateY);
    })
    .onEnd(() => {
      baseTranslateX.set(translateX.get());
      baseTranslateY.set(translateY.get());

      store.dispatch(
        updateTranslation({ x: translateX.get(), y: translateY.get() })
      );
    })
    .runOnJS(true);

  return { pan, translateX, translateY };
};
