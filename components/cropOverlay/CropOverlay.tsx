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
};

const CropOverlay = ({ screenWidth, aspectRatio }: CropOverlayProps) => {
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

      <BlurView style={styles.bottomOverlay} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  cropArea: {
    width: '100%',
  },
  bottomOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

const mapStateToProps = (state: RootState) => ({
  screenWidth: state.device.screenWidth,
  aspectRatio: state.param.aspectRatio,
});

export default connect(mapStateToProps)(CropOverlay);
