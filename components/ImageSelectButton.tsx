import { pickImageAsync } from '../utils/utils';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const ImageSelectButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default ImageSelectButton;
