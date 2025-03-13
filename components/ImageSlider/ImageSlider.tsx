import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { connect } from 'react-redux';

import { DeviceState, ImageState, ParamState, RootState } from '@/types';
import { GestureDetector } from 'react-native-gesture-handler';

import usePanGesture from '@/hooks/useImageSliderGesture';

const screenWidth = Dimensions.get('window').width;

type ImageSliderProps = {
  image: ImageState;
  param: ParamState;
  device: DeviceState;
};

const ImageSlider = ({ image, param, device }: ImageSliderProps) => {
  const { offsetY, slices } = param;

  const imageWidth = image.asset ? image.asset.width : 0;
  const imageHeight = image.asset ? image.asset.height : 0;

  const ImageContainerWidth = screenWidth * slices;
  const imageContainerHeight = ImageContainerWidth * (imageHeight / imageWidth);

  const cropStartHeight = device.topActionsBarHeight;

  const { composedGesture, updatedOffsetY } = usePanGesture(
    offsetY,
    cropStartHeight,
    imageContainerHeight
  );

  const imageContainerDimensions = {
    width: ImageContainerWidth,
    height: imageContainerHeight,
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: updatedOffsetY.value }],
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
  device: state.device,
});

export default connect(mapStateToProps)(ImageSlider);
