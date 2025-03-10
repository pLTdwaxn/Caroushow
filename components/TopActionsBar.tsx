import { View, StyleSheet } from 'react-native';
import SocialMediaSelect from './SocialMediaSelect';

import { BlurView } from 'expo-blur';

const TopActionsBar = () => {
  return (
    <BlurView style={styles.topActionsBarContainer}>
      <View style={styles.iconsRow}>
        <SocialMediaSelect />
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  topActionsBarContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    height: 120,
    padding: 8,
  },
  iconsRow: {
    flexDirection: 'row',
    width: '100%',
  },
});

export default TopActionsBar;
