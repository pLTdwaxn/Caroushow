import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { connect } from 'react-redux';

import { AppState, ImageState, ParamState, RootState } from '@/types';
import { GestureDetector } from 'react-native-gesture-handler';

import usePanGesture from '@/hooks/useImageSliderGesture';

type ImageSliderProps = {
  image: ImageState;
  param: ParamState;
  app: AppState;
};

const ImageSlider = ({ image, param, app }: ImageSliderProps) => {
  const { composedGesture, endY } = usePanGesture();
  const { y, slices } = param;
  const screenWidth = app.screen.width;

  const ImageContainerWidth = screenWidth * slices;
  const imageContainerHeight = ImageContainerWidth * image.aspectRatio;

  const imageContainerDimensions = {
    width: ImageContainerWidth,
    height: imageContainerHeight,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: endY.value }],
  }));

  return (
    <View style={styles.imageSlider}>
      <GestureDetector gesture={composedGesture}>
        <Animated.ScrollView
          horizontal
          snapToInterval={screenWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
        >
          <View style={[imageContainerDimensions, styles.imageContainer]}>
            <Animated.Image
              style={[styles.image, animatedStyle]}
              source={{ uri: image.asset.uri }}
              resizeMode="contain"
            />
          </View>
        </Animated.ScrollView>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSlider: {
    position: 'absolute',
    height: '100%',
  },
  imageContainer: {},
  image: {
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = (state: RootState) => ({
  image: state.image,
  param: state.param,
  app: state.app,
});

export default connect(mapStateToProps)(ImageSlider);
