import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  label: string | React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export default function ImageAdd({ label, disabled, onPress }: Props) {
  return (
    <Pressable style={[styles.button]} onPress={onPress}>
      <Text style={[styles.buttonLabel, disabled ? { color: "#bbb" } : {}]}>
        {label}
      </Text>
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
    fontSize: 16,
    color: "#5af",
  },
});