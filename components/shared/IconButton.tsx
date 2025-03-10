import { Pressable, PressableProps, Text, StyleSheet } from 'react-native';

type Props = PressableProps & {
  icon: React.ReactNode;
};

const IconButton = ({ icon, disabled, onPress }: Props) => {
  return (
    <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
      {disabled ? (
        <Text style={[{ color: '#ccc' }, styles.buttonLabel]}>{icon}</Text>
      ) : (
        ({ pressed }) => (
          <Text
            style={[
              { color: pressed ? '#58A6FF' : '#007aff' },
              styles.buttonLabel,
            ]}
          >
            {icon}
          </Text>
        )
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default IconButton;
