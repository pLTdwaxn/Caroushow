import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import SocialMediaSelect from './SocialMediaSelect';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import store from '@/store';
import { setTopActionsBarHeight } from '@/store/slices/deviceSlice';

const TopActionsBar = () => {
  const insets = useSafeAreaInsets();
  const viewRef = useRef<View>(null);

  const dispatch = store.dispatch;

  useEffect(() => {
    if (viewRef.current) {
      viewRef.current?.measure((_x, _y, _width, height) => {
        dispatch(setTopActionsBarHeight(height));
      });
    }
  }, []);

  return (
    <View ref={viewRef}>
      <BlurView
        style={[styles.topActionsBarContainer, { paddingTop: insets.top }]}
        tint="extraLight"
        intensity={80}
      >
        <View style={styles.iconsRow}>
          <SocialMediaSelect />
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  topActionsBarContainer: {
    justifyContent: 'flex-end',
    padding: 10,
    zIndex: 1,
  },
  iconsRow: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default TopActionsBar;
