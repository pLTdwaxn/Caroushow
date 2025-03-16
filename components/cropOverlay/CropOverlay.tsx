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
  const { composedGesture, tapOnAspectRatioLabel, endHeight } =
    useCropOverlayGestures();

  const animatedStyle = useAnimatedStyle(() => ({
    height: endHeight.value,
  }));

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[styles.cropArea, animatedStyle]}
        pointerEvents="none"
      />

      <GestureDetector gesture={composedGesture}>
        <DragHandle tapOnAspectRatioLabel={tapOnAspectRatioLabel} />
      </GestureDetector>

      <BlurView
        style={styles.cropShade}
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
  cropShade: {
    flex: 1,
    width: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  screenWidth: state.app.screen.width,
  aspectRatio: state.param.aspectRatio,
});

export default connect(mapStateToProps)(CropOverlay);
