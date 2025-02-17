import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { connect } from "react-redux";

import CreatePanel from "@/components/create/CreatePanel";

const Index = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <CreatePanel />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const mapStateToProps = (state: any) => ({
  image: state.image,
});

export default connect(mapStateToProps)(Index);
