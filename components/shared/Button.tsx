import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  label: string | React.ReactNode;
  disabled?: boolean;
  onPress?: () => void;
};

export default function ImageAdd({ label, disabled, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      {disabled ? (
        <Text style={[{ color: "#ccc" }, styles.buttonLabel]}>{label}</Text>
      ) : (
        ({ pressed }) => (
          <Text
            style={[
              { color: pressed ? "#58A6FF" : "#007aff" },
              styles.buttonLabel,
            ]}
          >
            {label}
          </Text>
        )
      )}
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
  },
});
