import {} from "./utils";
import { View, Text, StyleSheet } from "react-native";

const SocialMediaSelectButton = () => {
  return (
    <View style={styles.socialMediaSelector}>
      <Text>Select Social Media</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  socialMediaSelector: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SocialMediaSelectButton;
