import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

export default function ImageAdd({ label, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    fontSize: 20,
    color: "#aaa",
  },
});
