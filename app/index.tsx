import { useState } from "react";
import { View, Dimensions, Button, StyleSheet } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "@/components/ImageViewer";
import ImageSelectButton from "@/components/ImageSelectButton";

const SocialMedia = [
  {
    name: "Instagram",
    imgRatio: {
      width: 4,
      height: 5,
    },
  },
];

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const targetSocialMedia = SocialMedia.find(
    (media) => media.name === "Instagram"
  );

  const socialMediaImageRatio = targetSocialMedia
    ? targetSocialMedia.imgRatio
    : { width: 1, height: 1 };

  const { width, height } = socialMediaImageRatio;

  const viewerStyle = {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").width / width) * height,
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, viewerStyle]}>
        {image ? (
          <ImageViewer imgSource={image} />
        ) : (
          <ImageSelectButton onPress={pickImageAsync} />
        )}
      </View>
      {image && <Button title="Reset" onPress={() => setImage(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    backgroundColor: "#333",
    justifyContent: "center",
  },
});
