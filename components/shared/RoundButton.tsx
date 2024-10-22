import { View, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  onPress: () => void;
};

export default function RoundButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <Ionicons name="logo-instagram" size={32} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    width: 60,
    height: 60,
    marginHorizontal: 60,
    borderWidth: 2,
    borderColor: "#ffd33d",
    borderRadius: 30,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
