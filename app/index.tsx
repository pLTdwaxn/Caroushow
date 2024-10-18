import { useState } from "react";
import { View, Button, StyleSheet } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

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

  const imgRatio = targetSocialMedia
    ? targetSocialMedia.imgRatio
    : { width: 1, height: 1 };

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
      <View style={styles.imageContainer}>
        <ImageViewer
          imgSource={image ? image : PlaceholderImage}
          imgRatio={imgRatio}
        />
        <Button title="Select an image" onPress={pickImageAsync} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 0,
  },
});
