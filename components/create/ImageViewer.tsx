import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import CropGuide from "@/components/create/CropGuide";

type Props = {
  imgSource: string | null;
};

export default function ImageViewer({ imgSource }: Props) {
  return (
    <>
      <Image source={imgSource} style={styles.imageStyle} />
      <CropGuide rows={1} columns={3} ratio={{ width: 4, height: 5 }} />
    </>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
