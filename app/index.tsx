import { useState } from "react";
import { View, StyleSheet } from "react-native";

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
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} imgRatio={imgRatio} />
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
