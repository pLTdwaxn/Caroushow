import { useState } from "react";
import { View, Dimensions, StyleSheet, Pressable } from "react-native";

import { ImageContentFit } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import ImageCropper from "../ImageCropper";

import ImageViewer from "@/components/create/ImageViewer";
import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";
import CropGuide from "@/components/create/CropGuide";
import Button from "@/components/shared/Button";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
  const [contentFit, setContentFit] = useState<"contain" | "cover">("contain");
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const SocialMedia = [
    {
      name: "Instagram",
      imgRatio: {
        width: 4,
        height: 5,
      },
    },
  ];

  const switchContentFit = () => {
    setContentFit(contentFit === "contain" ? "cover" : "contain");
  };

  if (status === null) {
    requestPermission();
  }

  const targetSocialMedia = SocialMedia.find(
    (media) => media.name === "Instagram"
  );

  const socialMediaImageRatio = targetSocialMedia
    ? targetSocialMedia.imgRatio
    : { width: 1, height: 1 };

  const { width, height } = socialMediaImageRatio;

  const quality = "720p";

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

  const resetImage = () => {
    setImage(null);
  };

  const ImageCropperOptions = {
    rows: 1,
    cols: 3,
    compress: 1,
  };

  const runImageCropper = async () => {
    if (image) {
      const imageCropper = new ImageCropper(image, ImageCropperOptions);

      return await imageCropper.run();
    }
    return [];
  };

  const saveImageAsync = async () => {
    try {
      const croppedImages = await runImageCropper();

      for (const croppedImage of croppedImages) {
        await MediaLibrary.saveToLibraryAsync(croppedImage.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Pressable onPress={switchContentFit}>
          <View style={[styles.imageContainer, viewerStyle]}>
            <ImageViewer imgSource={image} contentFit={contentFit} />
            <CropGuide rows={1} columns={3} ratio={socialMediaImageRatio} />
          </View>
        </Pressable>
      ) : (
        <View style={[styles.imageContainer, viewerStyle]}>
          <ImageSelectButton onPress={pickImageAsync} />
        </View>
      )}
      <View style={styles.chinContainer}>
        <ActionsBar>
          <Button
            label={<Ionicons name="refresh-outline" size={24} />}
            disabled={!image}
            onPress={resetImage}
          />
          <Button label={`${width}:${height}`} disabled={true} />
          <Button
            label={`${ImageCropperOptions.rows}x${ImageCropperOptions.cols}`}
            disabled={true}
          />
          <Button label={quality} disabled={true} />
          <Button
            label={<Ionicons name="download-outline" size={24} />}
            disabled={!image}
            onPress={saveImageAsync}
          />
        </ActionsBar>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    backgroundColor: "#000",
    justifyContent: "center",
  },
  chinContainer: {
    flex: 1,
    backgroundColor: "#eee",
    justifyContent: "flex-end",
  },
});
