import { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Image, ImageContentFit } from "expo-image";

type Props = {
  imgSource: string | null;
};

export default function ImageViewer({ imgSource }: Props) {
  const [contentFit, setContentFit] = useState<ImageContentFit>("contain");

  const switchContentFit = () => {
    setContentFit(contentFit === "contain" ? "cover" : "contain");
  };

  return (
    <Pressable onPress={switchContentFit}>
      <Image
        source={imgSource}
        style={styles.imageStyle}
        contentFit={contentFit}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
