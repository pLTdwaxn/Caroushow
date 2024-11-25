import { View, Dimensions, StyleSheet } from "react-native";

import ImageViewer from "@/components/create/ImageViewer";

const Index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    backgroundColor: "#000",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

export default Index;
