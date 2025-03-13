import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import BottomActionsBar from '../BottomActionsBar';
import ImageSlider from '../imageSlider/ImageSlider';
import TopActionsBar from '../topActionsBar/TopActionsBar';
import CropOverlay from '../cropOverlay/CropOverlay';

const ControlPanel = () => {
  const [isTopActionsBarRendered, setIsTopActionsBarRendered] = useState(false);

  useEffect(() => {
    setIsTopActionsBarRendered(true);
  }, []);

  return (
    <View style={styles.container}>
      <TopActionsBar />
      {isTopActionsBarRendered && <ImageSlider />}
      {isTopActionsBarRendered && <CropOverlay />}
      <BottomActionsBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ControlPanel;
