import { StyleSheet } from "react-native";

import Button from "../shared/Button";

type Props = {
  onPress: () => void;
};

export default function ImageSelectButton({ onPress }: Props) {
  return <Button label="Select an Image" onPress={onPress} />;
}
