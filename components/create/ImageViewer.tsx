import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type Props = {
  imgSource: string | null;
};

export default function ImageViewer({ imgSource }: Props) {
  return <Image source={imgSource} style={styles.imageStyle} />;
}

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
