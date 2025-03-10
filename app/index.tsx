import { connect } from 'react-redux';

import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ImageSelectButton from '@/components/ImageSelectButton';

import { ImageState } from '@/types';
import store from '@/store';
import { setDevice } from '@/store/slices/deviceSlice';
import CrontrolPanel from '@/components/controlPanel/ControlPanel';

const deviceDimensions = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};

store.dispatch(setDevice(deviceDimensions));

type IndexPageProps = {
  image: ImageState;
};

const index = ({ image }: IndexPageProps) => {
  return (
    <GestureHandlerRootView>
      {image.asset !== null ? <CrontrolPanel /> : <ImageSelectButton />}
    </GestureHandlerRootView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    image: state.image,
  };
};

export default connect(mapStateToProps)(index);
