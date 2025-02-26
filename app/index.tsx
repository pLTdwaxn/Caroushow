import CreateTab from "@/components/createTab";
import { Text, View, StyleSheet } from "react-native";
import store from "../store";
import { Provider } from "react-redux";

const index = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <CreateTab />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
