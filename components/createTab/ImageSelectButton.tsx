import { pickImageAsync } from "./utils";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ImageSelectButton;
