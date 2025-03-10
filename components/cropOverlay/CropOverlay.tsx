import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';

import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { BlurView } from 'expo-blur';

import { RootState } from '@/types';
import { useCropOverlayGestures } from '@/hooks/useCropOverlayGestures';
import DragHandle from './DragHandle';
import { cycleSlices } from '@/utils/utils';

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
      <Button title={slices.toString()} onPress={cycleSlices} />

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
  slices: state.param.slices,
});

export default connect(mapStateToProps)(CropOverlay);
