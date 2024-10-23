import { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";

import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import Ionicons from "@expo/vector-icons/Ionicons";

import ImageCropper from "../ImageCropper";

import ImageViewer from "@/components/create/ImageViewer";
import ImageSelectButton from "@/components/create/ImageSelectButton";
import ActionsBar from "@/components/create/ActionsBar";
import Button from "@/components/shared/Button";

/*
  Define the workflow here.

  1. Select the target social media. Default is Instagram.
  1.1. Read the compatible image ratio range from the fixture.
  1.2. If there is no compatible image ratio, set the default ratio to 1:1.
  1.3. Read the optimal image resolution from the fixture.
  1.4. If there is no optimal image resolution, set the default resolution to 720x720.

  2. Select an image from the device.
  2.1. If an image is selected, hide the "Select an image" button and display the image.
  2.2. Show the "Run!" button.

  3. Run the image cropper if the "Run!" button is pressed.
*/

export default function Index() {
  const [image, setImage] = useState<string | null>(null);
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
        <>
          <View style={[styles.imageContainer, viewerStyle]}>
            <ImageViewer imgSource={image} />
          </View>
        </>
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
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 0,
  },
  imageContainer: {
    backgroundColor: "#333",
    justifyContent: "center",
    zIndex: 0,
  },
  chinContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    zIndex: 1,
  },
});
