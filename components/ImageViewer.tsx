import { useState } from "react";
import { StyleSheet, Dimensions, View, Pressable } from "react-native";
import { Image, ImageContentFit } from "expo-image";

type Props = {
  imgSource: string;
  viewerRatio: {
    width: number;
    height: number;
  };
};

export default function ImageViewer({ imgSource, viewerRatio }: Props) {
  const { width, height } = viewerRatio;
  const [contentFit, setContentFit] = useState<ImageContentFit>("contain");

  const viewerStyle = {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width / width) * height,
  };

  const switchContentFit = () => {
    setContentFit(contentFit === "contain" ? "cover" : "contain");
  };

  return (
    <View style={[styles.imageContainer, viewerStyle]}>
      <Pressable onPress={switchContentFit}>
        <Image
          source={imgSource}
          style={styles.imageStyle}
          contentFit={contentFit}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#000",
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
