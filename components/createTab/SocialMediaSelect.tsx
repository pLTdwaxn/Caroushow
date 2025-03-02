import { View, Text, StyleSheet } from "react-native";
import { selectSocialMedia } from "./utils";
import IconButton from "@/components/IconButton";
import { Ionicons } from "@expo/vector-icons";

const SocialMediaSelect = () => {
  const icon = <Ionicons name="logo-instagram" size={24} color="white" />;

  return (
    <View style={styles.test}>
      <View style={styles.socialMediaIcon}>
        <IconButton icon={icon} onPress={selectSocialMedia} />
      </View>
      <View style={styles.textLabel}>
        <Text style={styles.boldText}>Caroushow</Text>
        <Text style={styles.whiteText}>Designing for Instagram</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialMediaIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C13584", // Instagram gradient color
  },
  textLabel: {
    marginLeft: 12,
  },
  boldText: {
    fontWeight: "bold",
    color: "white",
  },
  whiteText: {
    color: "white",
  },
});

export default SocialMediaSelect;
