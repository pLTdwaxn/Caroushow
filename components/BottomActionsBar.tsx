import { View, StyleSheet } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import IconButton from '@/components/shared/IconButton';
import { pickImageAsync, sliceImage } from '@/utils/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomActionsBar = () => {
  const ShareIcon = <Ionicons name="share-outline" size={24} />;
  const AddIcon = <Ionicons name="add-outline" size={24} />;
  const moreIcon = <Ionicons name="ellipsis-horizontal" size={24} />;

  const handleShare = () => {
    sliceImage();
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.BottomActionsBarContainer,
        { paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.iconsRow}>
        <IconButton icon={moreIcon} onPress={() => {}} />
        <IconButton icon={AddIcon} onPress={pickImageAsync} />
        <IconButton icon={ShareIcon} onPress={handleShare} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  BottomActionsBarContainer: {
    zIndex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default BottomActionsBar;
