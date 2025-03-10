import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { BlurView } from 'expo-blur';

import { RootState } from '@/types';
import { useCropOverlayGestures } from '@/hooks/useCropOverlayGestures';
import DragHandle from './DragHandle';

type CropOverlayProps = {
  screenWidth: number;
  aspectRatio: number;
  slices: number;
};

const CropOverlay = ({
  screenWidth,
  aspectRatio,
  slices,
}: CropOverlayProps) => {
  const { composedGesture, updatedHeight } = useCropOverlayGestures(
    screenWidth,
    aspectRatio
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: updatedHeight.value,
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[styles.cropArea, animatedStyle]}
        pointerEvents="none"
      />

      <GestureDetector gesture={composedGesture}>
        <DragHandle />
      </GestureDetector>

      <BlurView
        style={styles.bottomOverlay}
        tint="extraLight"
        intensity={80}
        pointerEvents="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cropArea: {},
  bottomOverlay: {
    flex: 1,
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  screenWidth: state.device.screenWidth,
  aspectRatio: state.param.aspectRatio,
  slices: state.param.slices,
});

export default connect(mapStateToProps)(CropOverlay);
