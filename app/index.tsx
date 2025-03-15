import { connect } from 'react-redux';

import { Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ImageSelectButton from '@/components/ImageSelectButton';

import { ImageState } from '@/types';
import store from '@/store';
import CrontrolPanel from '@/components/controlPanel/ControlPanel';
import { setCropArea, setScreen } from '@/store/slices/appSlice';
import { setSocialMedia } from '@/store/slices/socialMediaSlice';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

store.dispatch(setScreen({ width: width, height: height }));
store.dispatch(setCropArea({ width: width, height: width }));
store.dispatch(
  setSocialMedia({ name: 'Instagram', minRatio: 0.523, maxRatio: 1.25 })
);

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
